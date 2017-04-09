'use strict';

var express = require('express'),
	router = express.Router(),
	controller = require('./register.controller');

router.post('/', controller.register);
router.get('/:hash', controller.confirm);

module.exports = router;
