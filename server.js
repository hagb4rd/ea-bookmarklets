var port = process.env.PORT || 3000;

var http =  require("https");
var api = require("./endpoint");

var server = http.createServer(api).listen(port);

module.exports = server;

console.log("Bookmarklet Server Endpoint [LISTENING]");
console.log(`http://localhost:${port}`);