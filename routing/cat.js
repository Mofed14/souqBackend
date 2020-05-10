const express = require('express');
const moongoose = require('mongoose')
const catcontroller =require('../controller/cat')
const router = express.Router()


const path   = require('path')
const multer = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let ex = path.extname(file.originalname)
         cb(null, Date.now() + ex)
      }
})


var upload = multer ({
    storage: storage,
    fileFilter: function(req,file,callback){
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png'){
            callback(null, true)
            }  else {
                console.log('only jpg & png file supported!');
                callback(null, false);
        }
    },
    limits:{
        fileSize: 1024 *1024 *2
    }
})



router.get('/', catcontroller.listALl)
router.post('/', catcontroller.create)
router.put('/:cat_id', catcontroller.update)
router.get('/:cat_id', catcontroller.view)

///////////////////////// localhost:3000/catergories/cat_id

// router.post('/:cat_id', upload.array('photo'),catcontroller.InsertProInCat)


module.exports = router