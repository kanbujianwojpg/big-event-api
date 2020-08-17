const express = require('express');
const cors = require('cors');

const app = express();

// 处理客户端请求post参数
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//配置后端cors跨域
app.use(cors());

app.listen(6666, () => {
  console.log('running...');
});

app.get('/user', (req, res) => {
  console.log('hi');
});
