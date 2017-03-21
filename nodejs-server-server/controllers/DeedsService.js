'use strict';
var Humans = require('./HumansService');
var deeds = [];
deeds[0] = {
    "Human": {
        "Address": "aeiou",
        "FirstName": "aeiou",
        "PhoneNumber": "aeiou",
        "Id": 0,
        "LastName": "aeiou",
        "MiddleName": "aeiou",
        "EmailAddress": "aeiou"
    },
    "Id": 0,
    "Name": "aeiou"
};
exports.deeds_get = function (args, res, next) {
    /**
     *
     * returns List
     **/
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(deeds || {}, null, 2));
};

exports.deeds_getById = function (args, res, next) {
    /**
     *
     * id Integer
     * returns List
     **/
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(deeds[args.id.originalValue] || {}, null, 2));
};

exports.deeds_post = function (args, body, res, next) {
    /**
     *
     * id Integer
     * returns List
     **/
    let ds = {};

    Humans.humans.forEach((item, i, arr) => {
        if (item.Id == body.HumanId) ds.Human = item;
        else res.end({});
    });

    ds.Id = deeds.length;
    ds.Name = body.Name;
    deeds[deeds.length] = ds;
    res.end(JSON.stringify(ds || {}, null, 2));
};

