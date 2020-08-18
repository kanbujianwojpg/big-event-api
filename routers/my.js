/**
 * 个人中心模块
 */

const express = require('express');
const path = require('path');
const router = express.Router();
//导入加密模块包
const utility = require('utility');
const db = require(path.join(__dirname, '../common/db.js'));

//获取用户信息
router.get('/userinfo', async (req, res) => {
  // console.log(req.user);
  //获取token中的用户信息
  let userInfo = req.user;
  //根据用户的id查询用户的详细数据
  let sql = 'select id,username,nickname,email,user_pic from user where id = ?';
  let ret = await db.operateDb(sql, userInfo.id);
  if (ret && ret.length > 0) {
    res.json({
      status: 0,
      message: '获取用户数据成功',
      data: [ret[0]],
    });
  } else {
    res.json({
      status: 1,
      message: '获取用户数据失败',
    });
  }
});
//修改密码
router.post('/updatepwd', async (req, res) => {
  //获取请求参数
  let id = req.user.id;
  let params = req.body;
  //2.对密码进行加密
  params.oldPwd = utility.md5(params.oldPwd);
  params.newPwd = utility.md5(params.newPwd);

  //更新数据库信息(根据原密码更新新密码)
  let sql = 'update user set password = ? where id = ? and password = ?';
  let ret = await db.operateDb(sql, [params.newPwd, id, params.oldPwd]);
  if (ret && ret.affectedRows > 0) {
    res.json({
      //更新成功
      status: 0,
      message: '修改密码成功',
    });
  } else {
    res.json({
      status: 1,
      message: '修改密码失败',
    });
  }
});

//更新用户头像
router.post('/update/avatar', async (req, res) => {
  //1.获取请求参数
  let id = req.user.id;
  let avatar = req.body.avatar;
  //2.操作数据库进行更新
  let sql = 'update user set user_pic = ? where id = ?';
  let ret = await db.operateDb(sql, [avatar, id]);
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '更新头像成功',
    });
  } else {
    res.json({
      status: 1,
      message: '更新头像失败',
    });
  }
});

//更新用户信息
router.post('/userinfo', async (req, res) => {
  //1.获取请求参数
  let params = req.body;
  //操作数据库进行更新
  let sql = 'update user set ? where id = ?';
  let ret = await db.operateDb(sql, [{ nickname: params.nickname, email: params.email }, params.id]);
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '更新用户信息成功',
    });
  } else {
    res.json({
      status: 1,
      message: '更新用户信息失败',
    });
  }
});

module.exports = router;
