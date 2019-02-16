const hydraExpress = require('hydra-express');
let hydra = hydraExpress.getHydra();
const fs = require('fs');
let config = require('./config.json');
let userModel = require('./models/model').user
let hatModel = require('./models/model').hat

hydraExpress.init(config, () => {
    let express = hydraExpress.getExpress();
    let api = express.Router();
    api.get('/order-pay', (req,res) => {
        let pageNo = parseInt(req.query.pageNo)
        let lt = Number(req.query.lt)
        let gt = Number(req.query.gt)
        const size = 50
        let patt = new RegExp(/^([1-9]\d*)$/)
        let patt2 = new RegExp(/^(0|[1-9]\d*)$/)
        let query = {}
        let pipeline =[];
        query.skip = size * (pageNo - 1)
        query.limit = size
        pipeline.push(
            {   
                $lookup:{from:"hats", 
                         localField:"hats" ,
                         foreignField:"_id", 
                         as:"total"}
            },
            {
                $skip: query.skip
            },
            {
                $limit: query.limit
            },
            {
                $project: {"email":1,
                           "_id": -1, 
                           "priceSum":{"$sum": {
                                                "$map": { "input": "$total",
                                                          "as": "it", 
                                                          "in":"$$it.price" 
                                                     } 
                                        }
                                    } 
                                }
                },
            {$sort: {priceSum:-1}}    
        )
        if (!patt.test(pageNo)){
            res.send({"error": "invalid page number, should start with 1"})
        }
        (patt2.test(gt)&&patt.test(lt))?pipeline.push({
            "$match": {
                "priceSum":{
                     $gte:gt,$lte:lt
                    }
                }
            }):null
        userModel.aggregate(pipeline, (err,result) =>{
            res.send(result)
            const content = JSON.stringify(result);

            fs.appendFile('../query1.json', content, 'utf8', (err) => {
                if (err) {
                    return console.log(err);
                }
            
                console.log("The file was saved!");
            }); 
        })       
    });
    api.get('/',(req,res) =>{
        res.send('hi')
    })
    hydraExpress.registerRoutes({
        '': api
    });
});