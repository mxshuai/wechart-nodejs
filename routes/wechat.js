var express = require('express');
var router = express.Router();
var wechat = require('wechat');

router.get('/', wechat("mxshuai", function (req, res, next) {
    var message = req.weixin;
    alert(message);
    if(message.MsgType == 'text'){
          res.reply({ type: "text", content: "you input " + message.Content});  
    }
}));

module.exports = router;
