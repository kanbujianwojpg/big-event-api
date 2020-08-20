const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
//导入express-jwt模块(解析token信息)
const jwt = require('express-jwt');
//导入路由模块
const loginRouter = require(path.join(__dirname, 'routers', 'login.js'));
const myRouter = require(path.join(__dirname, 'routers', 'my.js'));
const cateRouter = require(path.join(__dirname, 'routers', 'cate.js'));
const articleRouter = require(path.join(__dirname, 'routers', 'article.js'));
const db = require(path.join(__dirname, 'common', 'db.js'));

// 处理客户端请求post参数
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//配置后端cors跨域
app.use(cors());

//配置jwt的token解析中间件
//unless的作用排除一些路径不用解析token
app.use(jwt({ secret: 'bigEvent' }).unless({ path: /^\/api/ }));

//添加登录路由模块(路由中间件,只有访问到/api接口才会使用该中间件)
app.use('/api', loginRouter);
app.use('/my', myRouter);
app.use('/my', cateRouter);
app.use('/my', articleRouter);

app.listen(8888, () => {
  console.log('running...');
});

app.get('/data', async (req, res) => {
  let sql = 'select * from user';
  let result = await db.operateDb(sql);
  res.send(result);
});
