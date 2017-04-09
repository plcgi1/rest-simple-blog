'use strict';

var User = require('../user/user.model'),
	userProvider = require('../user/user.controller'),
	randomHash = require('random-hexhash'),
	sendmail = require('sendmail')(),
	config = require('../../config/environment');

function validationError (res, err) {
	return res.status(422).json(err);
}

function handleError(res, err) {
	return res.status(500).json({ error: err });
}

function getConfirmUrl (hash) {
	var host = config.host;

	if(config.port != 80) {
		host = host + ':' + config.port;
	}
	return 'http://' + host + '/app#!/register/confirm/' + hash;
}

function getConfirmText(url) {
	return 'Continue registration with URL: ' + url;
}

function getSubject (data) {
	return 'Registration confirmation';
}

// Register user
// req.body: { email:  String,  password: String, name: String }
exports.register = function(req, res) {
	// get user by email
	var query = User.findOne({	email: req.body.email });

	query.select('email');

	query.exec(function (err, user) {
		if (err) return handleError(err);

		// not exists - fuck request
		if (user) return validationError(res, 'Email is busy');

		var hash = randomHash({ length: 64}),
			url = getConfirmUrl(hash),
			text = getConfirmText(url),
			subject = getSubject(req.body);

		// exists: generate hash and save it to session {}
		req.session.register = {
			hash: hash,
			email: req.body.email,
			name: req.body.name,
			password: req.body.password
		};

		sendmail({
			from: 'no-reply@yourdomain.com',
			to: 'plcgi@no-spam.ws ',
			subject: subject,
			html: text,
		}, function(err, reply) {
			if (err) return res.status(500).send(err);

			res.status(200).json({ status: 'ok' });
		});
	});
};

// Confirm hash from email
// req.query: { hash: String }
exports.confirm = function(req, res, next) {
	var registerData = req.session.register;

	if (!registerData) {
		return res.status(404).json({ error: 'not found' });
	}

	if (registerData.hash !== req.params.hash) {
		return res.status(404).json({ error: 'bad input hash' });
	}

	req.body = registerData;

	userProvider.create(req, res, function (err, result) {

	});
};
