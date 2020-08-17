/**
 * 封装一个通用的操作数据库的方法
 */

function operateDb(sql, params = null) {
  return new Promise((resolve, reject) => {
    //1.导入mysql文件
    const mysql = require('mysql');

    //2.创建一个数据库连接
    const cn = mysql.createConnection({
      //数据库所在的计算机域名或者IP地址
      host: 'localhost',
      //端口
      port: '3306',
      //数据名称
      database: 'bigevent',
      //账号
      user: 'root',
      //账号密码
      password: 'admin123',
    });

    //3.进行连接操作
    cn.connect();

    //4.进行数据库操作
    // let sql = 'select * from user';
    //数据查询操作是异步的,无法通过回调函数
    let result = null;
    cn.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });

    //5.关闭数据库连接
    cn.end();
  });
}
module.exports = {
  operateDb: operateDb,
};
