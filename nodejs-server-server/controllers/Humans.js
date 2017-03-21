'use strict';

var url = require('url');

var Humans = require('./HumansService');

module.exports.humans_get = function humans_get (req, res, next) {
  Humans.humans_get(req.swagger.params, res, next);
};

module.exports.humans_getById = function humans_getById (req, res, next) {
  Humans.humans_getById(req.swagger.params, res, next);
};

module.exports.humans_post = function humans_post (req, res, next) {
  Humans.humans_post(req.swagger.params,req.body, res, next);
};
