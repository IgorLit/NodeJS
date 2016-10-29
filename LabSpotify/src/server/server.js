
var http = require("http");
var url = require("url");
var config = require("nconf");
config.argv()
    .env()
    .file({ file: 'config.json' });
function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+
                postDataChunk + "'.");
        });

        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });

    }

    http.createServer(onRequest).listen(config.get("server:port"));


    console.log("Server has started on port "+config.get("server:port"));
}

exports.start = start;