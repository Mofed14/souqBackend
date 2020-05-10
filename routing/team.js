const express = require('express');
const router = express.Router();
const teamController = require('../controller/team');



router.post('/register', teamController.register);
router.post('/login', teamController.login);
router.get('/', teamController.getMembers);
router.put('/:member_id', teamController.updateMember);

module.exports = router