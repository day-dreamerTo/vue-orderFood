/**
 * Created by admin on 17/4/26.
 * 模拟服务器调试
 */
var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/',function(req,res,next){
  req.url = '/index.html';
  next();
});

app.use(router);

//数据请求
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRouters = express.Router();

apiRouters.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});
apiRouters.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});
apiRouters.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api',apiRouters); // api

app.use(express.static('./dist'));// 设置静态目录

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
