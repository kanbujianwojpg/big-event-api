const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

//导入路由模块
const loginRouter = require(path.join(__dirname, 'routers', 'login.js'));
const db = require(path.join(__dirname, 'common', 'db.js'));

// 处理客户端请求post参数
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//配置后端cors跨域
app.use(cors());

//添加登录路由模块
app.use('/api', loginRouter);

app.listen(8888, () => {
  console.log('running...');
});

app.get('/data', async (req, res) => {
  let sql = 'select * from user';
  let result = await db.operateDb(sql);
  res.send(result);
});
