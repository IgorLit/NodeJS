'use strict';

var url = require('url');

var Crimes = require('./CrimesService');

module.exports.crimes_get = function crimes_get (req, res, next) {
  Crimes.crimes_get(req.swagger.params, res, next);
};

module.exports.crimes_getById = function crimes_getById (req, res, next) {
  Crimes.crimes_getById(req.swagger.params, res, next);
};

module.exports.crimes_postById = function crimes_postById (req, res, next) {
  Crimes.crimes_postById(req.swagger.params,req.body, res, next);
};
