/**
 * @name order-ad-v1-api
 * @description This module packages the Order-ad API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');
const fs = require('fs');
let userModel = require('../models/model').user
let hatModel = require('../models/model').hat

let serverResponse = new ServerResponse();
express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

let api = express.Router();

api.get('/',
(req, res) => {
  let pageNo = parseInt(req.query.pageNo)
  let pipeline = []
  const size = 50
  let skip = size * (pageNo - 1)
  pipeline.push(
    { $lookup:{
        from:"hats", 
        localField:"hats",
        foreignField:"_id", 
        as:"total"}
    },
    {
      $skip: skip
    }, 
    {
      $limit: size
    },   
    { $project: {
        "email":1,
        "price": {
           "$map": { 
             "input": "$total",
             "as": "it", 
             "in":"$$it.price" 
            }
          }
        }
      },{
        $sort: {priceSum:-1}
      }
  )
  userModel.aggregate(pipeline,(err,result) => {
    res.render('table',{'result': result})
    const content = JSON.stringify(result);
    fs.appendFile('../query2.json', content, 'utf8', (err) => {
      if (err) {
          return console.log(err);
      }
  
      console.log("The file was saved!");
  }); 
  })
});

module.exports = api;
