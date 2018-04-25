var browserify = require('browserify');
var fs = require('fs');

var b = browserify('./index.js');
b.transform('brfs');

b.bundle().pipe(fs.createWriteStream('./public/ea-bookmarklets.js'));