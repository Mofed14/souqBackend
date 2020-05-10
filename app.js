const express   = require('express');
const app       = express();
const cat       = require('./routing/cat');
const pro       = require('./routing/product');
const team      = require('./routing/team');
const seller    = require('./routing/seller');
const mongoose  = require('mongoose');



mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/youssef',{useNewUrlParser: true, useUnifiedTopology: true});
app.use([express.urlencoded({extended:true}),express.json({})])

app.use('/uploads', express.static('uploads'))
app.use('/categories',cat);
app.use('/product' ,pro)
app.use('/team', team)
app.use('/seller', seller)

app.listen(3000);
module.exports = app;