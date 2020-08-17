/**
 * 登录路由模块
 */
//路由模块

const express = require('express');
const router = express.Router();

//配置登录路由的地址
router.get('/login', (req, res) => {
  res.send('login');
});

//导出路由模块
module.exports = router;
