/**
 * Main application routes
 */

'use strict';

var path = require('path');
var express = require('express');

module.exports = function(app) {
  app.use('/api/posts', require('./api/post'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
};
