'use strict';

var User = require('../user/user.model'),
	userProvider = require('../user/user.controller'),
	authService = require('../../auth/auth.service'),
	randomHash = require('random-hexhash'),
	sendmail = require('sendmail')(),
	jwt = require('jsonwebtoken'),
	config = require('../../config/environment');

function validationError (res, err) {
	return res.status(422).json(err);
}

function handleError(res, err) {
	return res.status(500).json({ message: err });
}

function getConfirmUrl (hash) {
	var host = config.host;

	if(config.port != 80) {
		host = host + ':' + config.port;
	}
	return '<a href="http://' + host + '/app#!/reset-password/confirm/' + hash + '">link</a>';
}

function getConfirmText(url) {
	return 'Continue to reset password with URL: ' + url;
}

function getSubject (data) {
	return 'Reset password info';
}

function getUserProfileUrl (user) {
	var host = config.host;

	if(config.port != 80) {
		host = host + ':' + config.port;
	}
	return '<a href="http://' + host + '/app#!/profile">link</a>';
}

// Send auth link to user email
// req.body: { email:  String }
exports.reset = function(req, res) {
	// get user by email
	var query = User.findOne({	email: req.body.email });

	query.select('email');

	query.exec(function (err, user) {
		if (err) return handleError(err);

		// not exists - fuck request
		if (!user) return validationError(res, 'No such email');

		var token = authService.signToken(user._id),
			url = getConfirmUrl(token),
			text = getConfirmText(url),
			subject = getSubject(req.body);

		sendmail({
			from: 'reset-password@post.com',
			to: req.body.email,
			subject: subject,
			html: text,
		}, function(err, reply) {
			if (err) return res.status(500).send(err);

			req.user = user;

			res.status(200).json({ status: 'ok' });
		});
	});
};

// Confirm hash from email
// req.query: { hash: String }
exports.confirm = function(req, res, next) {
	var token = authService.signToken(req.user._id);

	res.json({ token: token, email: req.user.email });
};
