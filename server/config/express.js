/**
 * Express configuration
 */

'use strict';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var limit = require('express-better-ratelimit')

module.exports = function (app) {
	var env = app.get('env');

	// rate limit
	app.use(limit({
		duration: 30000, //30 seconds
		max: 100 // requests to server
		//blackList: ['192.168.1.1']
	}));

	app.use(compression());

	// content negotiation
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use(express.static('client'));

	app.use(methodOverride());
	app.use(cookieParser());
	app.use(passport.initialize());

	app.use(session({
		secret: config.secrets.session,
		cookie: { maxAge: 20 * 60 * 1000 },
		store: new MongoStore({
			url: config.mongo.uri,
			stringify: false, // default true, if true, connect-mongo will serialize sessions using JSON.stringify before setting, and deserialize with JSON.parse when getting
			ttl: 20 * 60, // 20 min, 14 days default, when the session cookie has an expiration date, connect-mongo will use it, or it will use ttl option
			autoRemove: 'interval', // remove expired sessions, using defined interval
			autoRemoveInterval: 10 // 10 min default
		})
	}));

	if ('production' === env) {
		app.use(morgan('dev'));
	}

	if ('development' === env || 'test' === env) {
		app.use(morgan('dev'));
		app.use(errorHandler()); // Error handler - has to be last
	}
};