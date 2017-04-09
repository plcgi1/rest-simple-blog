/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Post = require('../api/post/post.model'),
	User = require('../api/user/user.model');

// Insert seed data below
var postSeed = require('../api/post/post.seed.json'),
	userSeed = require('../api/user/user.seed.json');

// Insert seed inserts below
Post.find({}).remove(function () {
	Post.create(postSeed);
});

// Insert seed inserts below
User.find({}).remove(function () {
	User.create(userSeed);
});
