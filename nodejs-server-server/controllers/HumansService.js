'use strict';

var humans = [];
humans[0] = {
    "Address": "aeiou",
    "FirstName": "aeiou",
    "PhoneNumber": "aeiou",
    "Id": 0,
    "LastName": "aeiou",
    "MiddleName": "aeiou",
    "EmailAddress": "aeiou"
};

exports.humans_get = function (args, res, next) {
    /**
     *
     * returns List
     **/
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(humans || {}, null, 2));
};

exports.humans_getById = function (args, res, next) {
    /**
     *
     * id Integer
     * returns List
     **/
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(humans[args.id.originalValue] || {}, null, 2));
};

exports.humans_post = function (args, body, res, next) {
    /**
     *
     * id Integer
     * returns List
     **/
    try {
        var hu = {
            "Address": body.Address,
            "FirstName": body.FirstName,
            "PhoneNumber": body.PhoneNumber,
            "Id": humans.length,
            "LastName": body.LastName,
            "MiddleName": body.MiddleName,
            "EmailAddress": body.EmailAddress
        };
        res.setHeader('Content-Type', 'application/json');
        humans[humans.length] = hu;
    }
    catch (ex){
     console.error("error in create human " + ex);
    }
    res.end(JSON.stringify(hu || {}, null, 2));
};

exports.humans = humans;