var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/search"] = requestHandlers.search;
handle["/multisearch"] = requestHandlers.multipleSearch;
handle["/index.js"]= requestHandlers.getScript;
handle["/style.css"]=requestHandlers.getStyle;
handle["/firstorlast"]=requestHandlers.folSearch;
try {
    server.start(router.route, handle);
}
catch(e){
    console.error("server error:"+e);
}