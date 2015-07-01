
/*
 * GET home page.
 */
var http = require('http');

var async = require('async');
var https = require('https');
var qs = require('querystring');
var path = require("path");
var fs = require('fs');

exports.ticket = function(){
	var newtime=parseInt(Date.now()/1000);
     var data=fs.readFileSync(path.join(__dirname,'access_token.json'),'utf8');
	//console.log("access_token_data: "+data);
	data=JSON.parse(data); 
	//console.log(data);
	//console.log(data.expire_time);
	
    if(newtime<data.expire_time){		
		access_token=data.access_token;	
        console.log("access_token:"+access_token);	
	 console.log('a access_token has  readed');
	var data2=fs.readFileSync(path.join(__dirname,'jsapi_ticket.json'), 'utf8');
	data2=JSON.parse(data2); 
	//console.log(data.expire_time);

	var jsapi_ticket=data2.ticket;	
	console.log("jsapi_ticket:"+jsapi_ticket);
	 console.log('a jsapi_ticket has  readed');
	 
   return jsapi_ticket;

	}else{
		
		var req = https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf40cd0d7dedb5bfa&secret=01b9d00ce47f544ef1fc4c219cdace77", function (res) {
	
  // res.setEncoding('utf8');
        res.on('data', function (chunk) {
			 	console.log("chunk:"+chunk);
	 // var takenjson = JSON.parse(chunk)['access_token'];   
	 
       accessjson=JSON.parse(chunk);
		console.log(accessjson);
		accessjson.expire_time=newtime+7000;
		accessjson_str=JSON.stringify(accessjson); 
		 fs.writeFile(path.join(__dirname,'access_token.json'), accessjson_str, function (err) {
			  if (err) throw err;			  
			  console.log('a new access_token is saved!'); //文件被保存
		  });
		  //accessjson=JSON.parse(accessjson); 
		  access_token=accessjson.access_token;	
		 
		   console.log("access_token:   "+access_token);	
		   
	 
        var req2 = https.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+access_token+"&type=jsapi", function (res2) {
          
             console.log('STATUS: ' + res2.statusCode);

            res2.on('data', function (chunk2) {			
				ticketjson=JSON.parse(chunk2);
				//ticketjson.expire_time=newtime+10;
				//console.log('new_ticketjson:'+ticketjson);
				ticketjson_str=JSON.stringify(ticketjson); 
				 fs.writeFile(path.join(__dirname,'jsapi_ticket.json'), ticketjson_str, function (err) {
					  if (err) throw err;			  
					  console.log('a new jsapi_ticket is saved!'); //文件被保存
				  });
				  //ticketjson=JSON.parse(ticketjson); 
				  jsapi_ticket=ticketjson.ticket;	
				   console.log('jsapi_ticket:'+jsapi_ticket);	
			
             				
                return jsapi_ticket;
			
                //res0.render('weixin',signjson);
				});
				
        });
        req2.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });
        req2.end();

        });
		
		
    });
	req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
req.end(); 
		
	};
	

};