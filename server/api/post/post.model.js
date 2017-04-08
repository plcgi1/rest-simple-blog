'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  content: String,
  title: String
});

module.exports = mongoose.model('Post', PostSchema);