'use strict';

var User = require('./user.model'),
	passport = require('passport'),
	config = require('../../config/environment'),
	jwt = require('jsonwebtoken');

function validationError(res, err) {
	return res.status(422).json(err);
}

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
	var newUser = new User(req.body);

	newUser.provider = 'local';
	newUser.role = 'user';
	newUser.save(function (err, user) {
		if (err) return validationError(res, err);

		var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: config.timeouts.token });

		res.json({ token: token, email: user.email });
	});
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
	var userId = req.params.id;

	User.findById(userId, function (err, user) {
		if (err) return next(err);

		if (!user) return res.status(401).json({ message: 'Unauthorized' });

		res.json(user.profile);
	});
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
	var userId = req.user._id,
		oldPass = String(req.body.oldPassword),
		newPass = String(req.body.newPassword);

	User.findById(userId, function (err, user) {
		if (user.authenticate(oldPass)) {
			user.password = newPass;

			user.save(function (err) {
				if (err) return validationError(res, err);

				res.status(200).json({ status: 'ok' });
			});
		}
		else {
			res.status(403).json({ message: 'Forbidden' });
		}
	});
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
	var userId = req.user._id;

	User.findOne({
		_id: userId
	}, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
		if (err) return next(err);

		if (!user) return res.status(401).json({ message: 'Unauthorized' });

		res.json(user);
	});
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
	res.redirect('/');
};
