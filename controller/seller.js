const sellermodel = require('../model/seller')




module.exports = {

    listALl: async (req, res) => {

        try {

            const result = await sellermodel.find()
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

    create: async (req, res) => {

        try {
            const result = await new sellermodel({
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



    view: async (req, res) => {

        try {
            seller_id = req.params.seller_id;
           
            const result = await sellermodel.findById(seller_id)
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


    update: async (req, res) => {

        const body = {};
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                body[key] = req.body[key]
            }
        }
        try {
            await sellermodel.update({
                _id: req.params.seller_id
            }, {
                $set: body

            })
            req.body['_id'] = req.params.seller_id;
            const response = {
                case: 1,
                message: 'seller updated successfully',
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