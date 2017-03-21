'use strict';

var url = require('url');

var Deeds = require('./DeedsService');

module.exports.deeds_get = function deeds_get (req, res, next) {
  Deeds.deeds_get(req.swagger.params, res, next);
};

module.exports.deeds_getById = function deeds_getById (req, res, next) {
  Deeds.deeds_getById(req.swagger.params, res, next);
};

module.exports.deeds_post = function deeds_post (req, res, next) {
  Deeds.deeds_post(req.swagger.params,req.body, res, next);
};
