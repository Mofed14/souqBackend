const express = require('express');
const router = express.Router();
const prodController = require('../controller/product');

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


router.get('/', prodController.listALl)
router.post('/', upload.array('photo') ,prodController.create )
router.put('/:prod_id', upload.array('photo'),prodController.update)
router.get('/:prod_id', prodController.view)


module.exports = router;