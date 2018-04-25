//bookmarklets 
// Bookmarkplet API Endpoint
// =======================
// --> https://bookmarklet-pnstl5je5zyt.runkit.sh/



var http = require("http");
var path = require("path");
var fs = require("fs");


// HTTPS Endpoint defintion --  https://bookmarklet-pnstl5je5zyt.runkit.sh/
// ---
var endpoint = module.exports = function(request, response) {
    var body = fs.createReadStream(path.join(__dirname, "public/index.html"));
    body.pipe(response);
};

