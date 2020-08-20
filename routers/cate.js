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

//根据 Id 获取文章分类数据
router.get('/article/cates/:id', async (req, res) => {
  let id = req.params.id;
  //1.操作数据库
  let sql = 'select * from cate where id = ?';
  let ret = await db.operateDb(sql, id);
  if (ret && ret.length > 0) {
    res.json({
      //更新成功
      status: 0,
      message: '获取文章分类数据成功',
      data: ret,
    });
  } else {
    res.json({
      status: 1,
      message: '获取文章分类数据失败',
    });
  }
});

//删除图书分类
router.get('/article/deletecate/:id', async (req, res) => {
  //1.获取请求参数
  let id = req.params.id;
  //2.操作数据库
  let sql = 'delete from cate where id = ?';
  let ret = await db.operateDb(sql, id);
  if (ret && ret.affectedRows > 0) {
    res.json({
      //更新成功
      status: 0,
      message: '删除分类成功',
    });
  } else {
    res.json({
      status: 1,
      message: '删除分类失败',
    });
  }
});

//更新图书分类
router.post('/article/updatecate', async (req, res) => {
  //1.获取请求参数
  let params = req.body;
  //2.操作数据库
  let sql = 'update cate set ? where id = ?';
  let ret = await db.operateDb(sql, [{ name: params.name, alias: params.alias }, params.id]);
  if (ret && ret.affectedRows > 0) {
    res.json({
      //更新成功
      status: 0,
      message: '修改分类成功',
    });
  } else {
    res.json({
      status: 1,
      message: '修改分类失败',
    });
  }
});

module.exports = router;
