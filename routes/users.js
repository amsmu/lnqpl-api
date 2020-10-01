const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');

router.post('/register', userController.create);
router.post('/sign-in', userController.signIn);

module.exports = router;
