'use strict';
var Promise = require("bluebird");
var needle = Promise.promisifyAll(require("needle"));
var config = require("nconf");
var cache = require("./cache");

async function search(searchObj) {
    let arrive;
    let result=null;
     await rememberArrival().then(time=>arrive=time);
        await cache.checkCache([searchObj.type],searchObj.searchString,Date.now()).then((res)=>{
            if(res)
                    result = [res,arrive];
        });
    if(result)
        return new Promise((resolve)=>{
            resolve(result);
        });
    else
    return await requestToSpotify(searchObj,arrive)
}

 async function multipleSearch(firstSearchObj,secondSearchObj,mode) {
  return await multipleRequestToSpotify(firstSearchObj,secondSearchObj,mode);
}

function multipleRequestToSpotify(firstSearchObj,secondSearchObj,mode) {
    let requests  = [
        needle.getAsync(getUrl(firstSearchObj.searchString,firstSearchObj.type, firstSearchObj.limit)),
        needle.getAsync(getUrl(secondSearchObj.searchString,secondSearchObj.type, secondSearchObj.limit))
    ];
    if(mode=="and")
        return Promise.all(requests);
    else if(mode=="or")
        return Promise.any(requests);
}
function requestToSpotify(searchObj,startTime) {
    return new Promise((resolve,reject)=>{
        needle.get(getUrl(searchObj.searchString,searchObj.type,searchObj.limit), function(error, response) {
            if (error)
                reject(error);
            if(response) {
                cache.addCache(searchObj.searchString,searchObj.type,response.body,new Date().setMinutes(new Date().getMinutes() + 5));
                resolve([response.body,startTime]);
            }
        });
    });
}
 function rememberArrival() {
    return new Promise((resolve,reject)=>{
        resolve(Date.now());
    });
}

function getUrl(searchString,type,limit) {
    return `https://api.spotify.com/v1/search?q=${searchString}&type=${type}&limit=${limit}`;
}
exports.rememberArrival=rememberArrival;
exports.search=search;
exports.multipleSearch=multipleSearch;