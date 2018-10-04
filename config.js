//do not overwrite. setup locale below.
var defaultConfig={
  sessionSecret: "hello kit",
  port: process.env["PORT"] || 3000
};

//require locale config file 
var locale={}

//locale=require('./locale');


var config = Object.assign({},defaultConfig,locale);

module.exports = config;
