var http = require('http');
var url = require("url"); 
var querystring = require('querystring');
exports.ajax = function(req, res){

  var params = url.parse(req.url,true).query;

 console.log(params.url);
    res.writeHead(500, { 'Content-Type': 'text/plain' });


res.end(params.url) ;


}
