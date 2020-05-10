const mongoose = require('mongoose');


const team = mongoose.Schema({

_id      : mongoose.Schema.Types.ObjectId,

firstname:{type:String, require:true},
lastname:{type:String, require:true},
email    : { type: String , require : true , unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
password : { type: String , require : true },
status   :String,
role     : {type: String, require: true}

})



module.exports = mongoose.model('Team', team)