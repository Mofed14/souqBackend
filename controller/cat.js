const mongoose = require('mongoose');
const catmodel = require('../model/cat')

module.exports = {


    listALl: async (req, res) => {

        try {

            const result = await catmodel.find()
            res.json({ 
                case:'1',
                message:'done',
                data : result.map(result=>{ // عشان ارجع الحاجات اللي محتاجاها فقط
                    return {
                        id    : result._id,
                        name : result.name,
                        isDeleted:result.isDeleted,
                    }
                  })
                 })
                 

        } catch (error) {

            const response ={
                case:'0',
                message:error.message
            }
        }
    },


    view: async (req, res) => {

        try {
            cat_id = req.params.cat_id;
           
            const result = await catmodel.findById(cat_id).populate('product')
            const response = {
                case:"1",
                message:'done',
                data:result
            }
            res.json(response)
        } catch (error) {
            const response = {
                case:"0",
                message:error.message
            }
            res.json(response)
        }


    },


    create: async (req, res) => {

        try {
            const result = await new catmodel({
                // _id:mongoose.Types.objectId(),
                name: req.body.name,
                isDeleted: false,
            }).save()

            const response = {
                case: 1,
                message: 'inserted',
                data: result
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

    update: async (req, res) => {

        const body = {};
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                body[key] = req.body[key]
            }
        }
        try {
            await catmodel.update({
                _id: req.params.cat_id
            }, {
                $set: body

            })
            req.body['_id'] = req.params.cat_id;
            const response = {
                case: 1,
                message: 'catgory updated successfully',
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


//////////////////////////////////////////////////

    //   InsertProInCat: async (req, res) => {

    //      const cat_id = req.params.cat_id

    //     //  console.log(cat_id);
         
    //      try {

    //         // console.log(req.files);
            
    //          const prod = await new productmodel({
    //             _id : mongoose.Types.ObjectId(),
    //             name: req.body.name,
    //             quantity: req.body.quantity,
    //             price: req.body.price,
    //             seller_id: req.body.seller_id,
    //             details:req.body.details,
    //             isDeleted: false,
                
    //         })
            
    //         if (req.files) {
    //             let path = ''
    //             req.files.forEach(function(files, index, arr) {
    //                 path = path + files.path + ','
    //             });
    //             path = path.substring(0, path.lastIndexOf(","))
    //             prod.photo = path
    //         }
            
            
    //         prod.save()

    //         const cat = await catmodel.findById(cat_id)
    //         // console.log(cat)
    //         cat.product.push(prod)
    //         await cat.save()
    //         res.json({
    //             case:'1',
    //             message:"inserted",
    //             data:cat.populate('product')
    //         })
    //     } catch (error) {
    //         res.json({
    //             case:'0',
    //             message:error.message
    //         })
            
    //     }
        
    //  }









}