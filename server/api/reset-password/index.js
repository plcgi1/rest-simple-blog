'use strict';

var express = require('express'),
	router = express.Router(),
	auth = require('../../auth/auth.service'),
	controller = require('./reset-password.controller');

router.post('/', controller.reset);
router.get('/', auth.isAuthenticated(), controller.confirm);

module.exports = router;
