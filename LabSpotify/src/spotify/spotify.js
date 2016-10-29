'use strict';
var Promise = require("bluebird");
var needle = Promise.promisifyAll(require("needle"));
var config = require("nconf");

function search(searchObj) {
    return new Promise(function (resolve,reject) {
        requestToSpotify(resolve,reject,searchObj);
    })
}

function multipleSearch(firstSearchObj,secondSearchObj,mode) {
    let requests  = [
        needle.getAsync(getUrl(firstSearchObj.searchString,firstSearchObj.type, firstSearchObj.limit)),
        needle.getAsync(getUrl(secondSearchObj.searchString,secondSearchObj.type, secondSearchObj.limit))
    ];
    if(mode=="and")
        return Promise.all(requests);
    else if(mode=="or")
        return Promise.any(requests);

}
function requestToSpotify(resolve,reject,searchObj) {
    needle.get(getUrl(searchObj.searchString,searchObj.type,searchObj.limit), function(error, response) {
        if (error)
            reject(error);
        if(response) {
            resolve(response.body);
        }
    });
}
function rememberArrival() {
    return new Promise(function (resolve,reject) {
        resolve(Date.now());
    })
}

function getUrl(searchString,type,limit) {
    return `https://api.spotify.com/v1/search?q=${searchString}&type=${type}&limit=${limit}`;
}

exports.search=search;
exports.multipleSearch=multipleSearch;