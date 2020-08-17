/**
 * 登录路由模块
 */
//路由模块

const express = require('express');
const path = require('path');
const router = express.Router();
const db = require(path.join(__dirname, '../common/db.js'));

//配置登录路由的地址
router.get('/login', (req, res) => {
  res.send('login');
});

//注册用户
router.post('/reguser', async (req, res) => {
  let sql = 'insert into user set ?';
  //获取到客户端传递值
  let params = {
    username: req.body.username,
    password: req.body.password,
  };
  //插入到数据库
  let ret = await db.operateDb(sql, params);
  console.log(ret);
  if (ret && ret.affectedRows > 0) {
    //注册成功
    res.json({
      status: 0,
      message: '注册成功',
    });
  } else {
    //注册失败
    res.json({
      status: 1,
      message: '注册失败',
    });
  }
});

//导出路由模块
module.exports = router;
