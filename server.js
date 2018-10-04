var port = process.env.PORT || 5000;

var http =  require("http");
var path = require("path");
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var url = require('url');
var querystring = require('querystring');
var config = require("./config");


var app = express();
var server = module.exports=http.createServer(app);

var SQLiteStore = require('connect-sqlite3')(session);

app.use(function(req, res, next) {
	var uri=url.parse(req.url);
	req.origin = uri.protocoll+'//'+uri.host;
	res.setHeader("Access-Control-Allow-Origin", req.origin);
	res.setHeader("Vary", req.origin);
	next();
});
app.use(cookieParser());
app.use(session({
  store: new SQLiteStore,
  secret: config.sessionSecret,
  cookie: { maxAge: 4 * (7 * 24 * 60 * 60 * 1000) }, // 4 weeks
  saveUninitialized: true,
  resave: true
}));
app.use('/',express.static(path.resolve(__dirname, './public')));


if (!module.parent) {
  app.listen(config.port);
  console.log(`Express started on port ${config.port}`);
}