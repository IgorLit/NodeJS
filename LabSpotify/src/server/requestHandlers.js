'use strict';
var querystring = require("querystring"),
    fs = require("fs"),
    url = require("url");
var spotify = require("../spotify/spotify");
var needle = require("needle");
var config = require("nconf");


function getScript(response) {
    console.log("Request handler 'start' was called.");
    fs.readFile('./web/javascript/index.js', function (err, js) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {"Content-Type": "script/javascript"});
        response.write(js);
        response.end();
    });
}
function getStyle(response) {
    console.log("Request handler 'start' was called.");
    fs.readFile('./web/styles/style.css', function (err, js) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(js);
        response.end();
    });
}
function start(response) {
    console.log("Request handler 'start' was called.");
    fs.readFile('./web/index.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
}
// [/search]
function search(response,request) {
   var searchObject = createSearchObject(querystring.parse(request),0);
    spotify.search(searchObject).then(function (data) {
       response.end(JSON.stringify([[data,searchObject.type]]));
   });
}
function multiSearch(response,request) {
    var firstObject = createSearchObject(querystring.parse(request),0);
    var secondObject = createSearchObject(querystring.parse(request),1);
    spotify.multipleSearch(firstObject,secondObject,"and").spread(function (res1,res2) {
        let result=[[res1.body,firstObject.type],[res2.body,secondObject.type]];
        response.end(JSON.stringify(result));
    });
}
function folSearch(response,request) {//first or last
    var firstObject = createSearchObject(querystring.parse(request),0);
    var secondObject = createSearchObject(querystring.parse(request),1);
    spotify.multipleSearch(firstObject,secondObject,"or").then(function (data) {
        response.end(JSON.stringify([[data.body, firstObject.type]]));
    });
}


function createSearchObject(parameters,index) {
    var searchString =parameters.searchString;
    var type = JSON.parse(parameters.type)[index];
    var limit = parameters.limit;
    //TODO Validate parameters!
    return {
        searchString:searchString,
        type:type,
        limit:limit
    }
}
exports.start = start;
exports.search=search;
exports.getScript= getScript;
exports.getStyle=getStyle;
exports.multipleSearch=multiSearch;
exports.folSearch=folSearch;