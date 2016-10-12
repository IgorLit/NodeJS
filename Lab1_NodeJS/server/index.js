var server = require("./server");
var router = require("./router");
var requestHandlers = require("./routeHandler");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/update"] = requestHandlers.update;
handle["/show"] = requestHandlers.show;
handle["/add"]=requestHandlers.add;
handle["/remove"]=requestHandlers.remove;
handle["/more"]=requestHandlers.more;
handle["/getMore"]=requestHandlers.getMore;
handle["/log"]=requestHandlers.getLog;
handle["/subscription"]=requestHandlers.loadSubscription;
server.start(router.route, handle);