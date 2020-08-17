const express = require('express');

const app = express();

app.listen(6666, () => {
  console.log('running...');
});

app.get('/user', (req, res) => {
  console.log(res);
});
