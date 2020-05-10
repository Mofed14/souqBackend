const mongoose = require('mongoose');

const product = mongoose.Schema ({
    // _id   : mongoose.Schema.Types.ObjectId,
    name:{type:String, require:true},
    quantity:{type:Number, require:true},
    price:{type:Number, require:true},
    photo:{type:String},
    seller_id:{type :mongoose.Schema.Types.ObjectId, ref : 'Seller'},
    cat_id: {type :mongoose.Schema.Types.ObjectId, ref : 'Cat'},
    details:{type:String, require:true},
    isDeleted:Boolean,
    // category :{type : mongoose.Schema.Types.ObjectId, ref : 'Cat'},
})

module.exports = mongoose.model('Product', product)