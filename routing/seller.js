const express = require('express');
const sellercontoller =require('../controller/seller')
const router = express.Router()



router.get('/', sellercontoller.listALl)
router.post('/', sellercontoller.create)
router.put('/:seller_id', sellercontoller.update)
router.get('/:seller_id', sellercontoller.view)



module.exports = router
