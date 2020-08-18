/**
 * 登录路由模块
 */
//路由模块

const express = require('express');
const path = require('path');
const router = express.Router();
//导入加密模块包
const utility = require('utility');
//导入jsonWebToken包生成token
const jwt = require('jsonwebtoken');
const db = require(path.join(__dirname, '../common/db.js'));

//配置登录路由的地址
router.get('/login', async (req, res) => {
  //1.获取客户端传递的参数
  let params = req.body;
  //2.对密码进行加密处理
  params.password = utility.md5(params.password);
  //3.查询数据库(根据用户名和加密后的密码)
  let sql = 'select id from user where username = ? and password = ?';
  let ret = await db.operateDb(sql, [params.username, params.password]);
  if (ret && ret.length > 0) {
    //登录成功,生成该用户的token信息(token中可以携带数据:用户名和id)
    let token = jwt.sign(
      {
        //添加到token的数据,可以反解
        username: params.username,
        id: ret[0].id,
      },
      'bigEvent', //加密额外的字符,俗称加盐
      { expiresIn: 60 * 60 } //token有效期
    );
    res.json({
      status: 0,
      message: '登录成功',
      token: 'Bearer ' + token,
    });
  } else {
    //登录失败
    res.json({
      status: 1,
      message: '登录失败',
    });
  }
});

//注册用户
router.post('/reguser', async (req, res) => {
  let sql = 'insert into user set ?';
  //获取到客户端传递值
  let params = {
    //md5加密是单向的,无法用过密码进行反解
    username: req.body.username,
    password: utility.md5(req.body.password),
  };
  //插入到数据库
  let ret = await db.operateDb(sql, params);
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
