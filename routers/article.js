/**
 * 文章管理
 */
const express = require('express');
const path = require('path');
const router = express.Router();
const db = require(path.join(__dirname, '../common/db.js'));

// 分页文章列表数据查询
router.get('/article/list', async (req, res) => {
  let params = req.query;
  //查询参数处理分类id和文章状态
  let condition = '';
  if (params.cate_id) {
    condition += 'cate_id=' + params.cate_id;
  }
  if (params.state) {
    if (condition) {
      condition += ' and ';
    }
    condition += 'state= "' + params.state + '"';
  }

  //处理分页参数pagenum(页码),pagesize(每页的条数)
  let page = ' limit ' + params.pagesize * (params.pagenum - 1) + ',' + params.pagesize;
  let sql = 'select a.id, a.title, a.pub_date, a.state, c.name as cate_name  from article as a left join cate as c on a.cate_id = c.id';
  let csql = 'select count(a.id) as total from article as a left join cate as c on a.cate_id = c.id';
  if (condition) {
    sql += ' where ' + condition;
    if (page) {
      sql += ' ' + page;
    }
    csql += ' where ' + condition;
  }
  let ret = await db.operateDb(sql);
  let cret = await db.operateDb(csql);
  if (ret && ret.length > 0 && cret && cret.length > 0) {
    res.json({
      status: 0,
      message: '获取文章列表成功',
      data: ret,
      total: cret,
    });
  } else {
    res.json({
      status: 0,
      message: '获取文章列表失败',
    });
  }
});

//删除文章
router.get('/article/delete/:id', async (req, res) => {
  let id = req.params.id;
  let sql = 'update article set is_delete = 2 where id = ?';
  let ret = await db.operateDb(sql, id);
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '删除文章成功',
    });
  } else {
    res.json({
      status: 0,
      message: '删除文章失败',
    });
  }
});

module.exports = router;
