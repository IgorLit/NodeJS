'use strict';

var Humans = require('./HumansService');
var crimes = [];
crimes[0] = {
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

exports.crimes_get = function (args, res, next) {
    /**
     *
     * returns List
     **/
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(crimes || {}, null, 2));
}

exports.crimes_getById = function (args, res, next) {
    /**
     *
     * id Integer
     * returns List
     **/
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(crimes[args.id.originalValue] || {}, null, 2));
}

exports.crimes_postById = function (args, body, res, next) {
    /**
     *
     * id Integer
     * returns List
     **/
    let cr = {};

    Humans.humans.forEach((item, i, arr) => {
        if (item.Id == body.HumanId) cr.Human = item;
    });

    cr.Id = crimes.length;
    cr.Name = body.Name;

    crimes[crimes.length] = cr;
    res.end(JSON.stringify(cr || {}, null, 2));
}

