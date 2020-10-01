const express = require('express');
const router = express.Router();
const personController = require('../app/api/controllers/person');

const Utils = require('../utils/utils');

router.get('/', Utils.validateUser, Utils.isAdmin, personController.getAll);
router.post('/', personController.create);

module.exports = router;
