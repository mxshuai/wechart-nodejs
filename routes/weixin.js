var http = require('http');

var sign = require('./../sign.js');
var ticket = require('./ticket.js');
var https = require('https');
var qs = require('querystring');
var fs = require('fs');


exports.weixin = function(req, res){

	var url = require("url"); 
		console.log(req.url);
	 var params = url.parse(req.url,true).query;
	 
	 
//var url=encodeURIComponent(req.protocol+'://'+req.host+':80'+req.url);
var url=params.url;

var intervalId= setInterval(yibutimer,1000);

function yibutimer(){
console.log("......");	
	var jsapi_ticket=ticket.ticket();
	console.log(jsapi_ticket);	
if(jsapi_ticket){
	console.log("over");
console.log('jsapi_ticket:   '+jsapi_ticket);
	signjson=sign(jsapi_ticket, url);
	console.log("signjson:   "+signjson);
		console.log("signature:   "+signjson.signature);
	    res.end(JSON.stringify(signjson));
		   clearInterval(intervalId);
		
		}else{
			
			return;
		}

		}



};