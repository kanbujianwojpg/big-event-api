/**
 * 文章分类模块
 */
const express = require('express');
const path = require('path');
const router = express.Router();
//导入加密模块包
const utility = require('utility');
const db = require(path.join(__dirname, '../common/db.js'));

//查询分类列表数据
router.get('/article/cates', async (req, res) => {
  //1.操作数据库
  let sql = 'select * from cate';
  let ret = await db.operateDb(sql);
  if (ret && ret.length > 0) {
    res.json({
      //更新成功
      status: 0,
      message: '查询分类数据成功',
      data: ret,
    });
  } else {
    res.json({
      status: 1,
      message: '查询分类数据失败',
    });
  }
});

//添加分类
router.post('/article/addcates', async (req, res) => {
  //1.获取请求参数
  let params = req.body;
  //2.操作数据库
  let sql = 'insert into cate set ?';
  let ret = await db.operateDb(sql, params);
  if (ret && ret.affectedRows > 0) {
    res.json({
      //更新成功
      status: 0,
      message: '添加文章分类成功',
    });
  } else {
    res.json({
      status: 1,
      message: '添加文章分类失败',
    });
  }
});

module.exports = router;
