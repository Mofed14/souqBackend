const mongoose = require('mongoose')


const seller = mongoose.Schema({

// _id   : mongoose.Schema.Types.ObjectId,
name:{type:String, require:true},
isDeleted:Boolean,
product :[{type : mongoose.Schema.Types.ObjectId, ref : 'Product'}]

})


module.exports = mongoose.model('Seller', seller)