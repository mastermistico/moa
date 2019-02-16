const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:O7DgnKqSqCFmvC6n@tests-0eeni.mongodb.net/test', () =>{
    console.log('connect!')
});
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    "_id":Schema.Types.ObjectId,
    "email":String,
    "hats":Array
})

module.exports.user = mongoose.model('user',userSchema);

const hatSchema = new Schema({
    "_id": Schema.Types.ObjectId,
    "name": String,
    "price": Number,
    "material": String
})

module.exports.hat = mongoose.model('hat',hatSchema);