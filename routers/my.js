/**
 * 个人中心模块
 */

const express = require('express');
const path = require('path');
const router = express.Router();
//导入加密模块包
const utility = require('utility');
const db = require(path.join(__dirname, '../common/db.js'));

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

module.exports = router;
