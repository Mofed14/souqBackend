const productmodel = require('../model/product');
const catmodel = require('../model/cat');
const sellermodel = require('../model/seller');
const mongoose = require('mongoose');
const async = require('async');


module.exports = {

    create: async (req, res) => {

        // const cat_id = req.params.cat_id

        //  console.log(cat_id);

        try {

            // console.log(req.files);

            const prod = await new productmodel({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
                seller_id: req.body.seller_id,
                cat_id: req.body.cat_id,
                details: req.body.details,
                isDeleted: false,

            })

            if (req.files) {
                let path = ''
                req.files.forEach(function (files, index, arr) {
                    path = path + files.path + ','
                });
                path = path.substring(0, path.lastIndexOf(","))
                prod.photo = path
            }


            prod.save()

            const cat = await catmodel.findById(req.body.cat_id)
            // console.log(cat)
            cat.product.push(prod)
            await cat.save()

            const seller = await sellermodel.findById(req.body.seller_id)
            // console.log(cat)
            seller.product.push(prod)
            await seller.save()

            res.json({
                case: '1',
                message: "inserted",
                //    data:cat.populate('product')
            })
        } catch (error) {
            res.json({
                case: '0',
                message: error.message
            })

        }

    }

    ,

    listALl: async (req, res) => {

        try {
            const result = await productmodel.find();
            const data = [];
            await result.map(resp => {
                if (resp.cat_id) {
                    catmodel.findById(resp.cat_id, (err, cate) => {
                        categorie = {
                            _id: cate._id,
                            name: cate.name
                        }
                        data.push({
                            _id: resp._id,
                            name: resp.name,
                            quantity: resp.quantity,
                            price: resp.price,
                            seller_id: resp.seller_id,
                            categorie: categorie,
                            details: resp.details,
                            // isDeleted: false
                        })

                    })
                }
            })
            setTimeout(() => {
                return res.json({
                    case: '1',
                    message: 'successfully process',
                    data: data
                })
            }, 1000);
        } catch (error) {
            const response = {
                case: '0',
                message: error.message,
            }
            res.json(response)
        }

    },
    view: async (req, res) => {

        try {
            prod_id = req.params.prod_id;
            const result = await productmodel.findById(prod_id)
            const response = {
                case: '1',
                message: 'successfully process',
                data: result
            }
            res.json(response)
        } catch (error) {
            const response = {
                case: '0',
                message: error.message
            }
            res.json(response)
        }
    },

    update: async (req, res) => {

        const body = {};
        for (var key in req.body) {
            body[key] = req.body[key]

        }
        try {
            const prod = await productmodel.update({
                _id: req.params.prod_id
            }, {
                $set: body

            })


            if (req.files) {
                let path = ''
                req.files.forEach(function (files, index, arr) {
                    path = path + files.path + ','
                });
                path = path.substring(0, path.lastIndexOf(","))
                req.body.photo = path
            }


            const response = {
                case: 1,
                message: 'product updated successfully',
                data: req.body
            }
            res.json(response)
        } catch (error) {
            const response = {
                case: 0,
                message: error.message,
            }
            res.json(response)
        }
    },

}