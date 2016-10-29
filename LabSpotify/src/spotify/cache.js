/**
 * Created by SAD on 29.10.2016.
 */
var cache = [];
function addCache(name,type, res, liveTime) {
    var isDuplicate = true;
    if(typeof  type == "string"){
        for(var i=0;i<cache.length;i++){
            if (!(cache[i].name == name && cache[i].type == type)) {
                isDuplicate=false;
            }
        }
        if(cache.length==0) isDuplicate=false;
        if(!isDuplicate) {
            var intoCache = {};
            intoCache.name = name;
            intoCache.type = type;
            intoCache.res = res;
            intoCache.liveTime = liveTime;

            cache.push(intoCache);
        }
    }
    if(typeof type == "object") {
        var cacheSize = cache.length;
        for(var i=0;i<type.length;i++)
            for(var j=0;j<cacheSize;j++){
                if (cache[j].name == name && cache[j].type == type[i]) {
                    break;
                }
                if (((cache[j].name != name && cache[j].type != type[i]) || (cache[j].name == name && cache[j].type != type[i]) || (cache[j].name != name && cache[j].type == type[i])) && (j+1 == cache.length)) {
                    var intoCache = {};
                    intoCache.name = name;
                    intoCache.type = type[i];
                    intoCache.res = res[i];
                    intoCache.liveTime = liveTime;
                    cache.push(intoCache);
                }
            }
        if(cache.length==0){
            var intoCache = {};
            intoCache.name = name;
            intoCache.type = type[0];
            if(res instanceof Array) intoCache.res = res[0];
            else intoCache.res = res;
            intoCache.liveTime = liveTime;
            cache.push(intoCache);
            if(type[0] != type[1]){
                intoCache.name = name;
                intoCache.type = type[1];
                if(res instanceof Array ) intoCache.res = res[1];
                else intoCache.res = res;
                intoCache.liveTime = liveTime;
                cache.push(intoCache);
            }
        }
    }
}

function checkCache(type,name,time) {
    return new Promise(function(resolve, reject) {
        var result=[];
        for(var i=0;i<cache.length;i++){
            for (var j=0;j<type.length;j++) {
                if (cache[i].name == name && (cache[i].type == type[j]) && time < cache[i].liveTime) {
                    result.push(cache[i].res);
                    break;
                }
            }
        }
        if(result.length >0) resolve(result[0]);
        else resolve(null);

    });
}

exports.checkCache=checkCache;
exports.addCache=addCache;