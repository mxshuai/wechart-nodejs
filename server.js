
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var wx = require('./routes/weixin');
var ajax = require('./routes/ajax');
var http = require('http');
var path = require('path');
var wechat = require('wechat');
var favicons = require('connect-favicons');

var app = express();

app.use(favicons(__dirname + '/public/img/icons'));
// all environments
app.set('port', process.env.PORT || 18080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/')));

app.use(express.query());

app.use('/wechat', wechat('mxshuai', function (req, res, next) {
    var message = req.weixin;
   res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://static7.eloancn.com/page/commons/images/logo_new.jpg',
        url: 'http://www.bfpifa.cn/public/weixin.html'
      }
    ]);
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/weixin',wx.weixin);
app.get('/ajax',ajax.ajax);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
