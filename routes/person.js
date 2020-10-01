const express = require('express');
const router = express.Router();
const personController = require('../app/api/controllers/person');

router.get('/', personController.getAll);
router.post('/', personController.create);

module.exports = router;
