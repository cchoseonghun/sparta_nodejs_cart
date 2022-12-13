const express = require('express');
const app = express();
const PORT = 3000;

const goodsRouter = require('./routes/goods');
const cartsRouter = require('./routes/carts');

const connect = require("./schemas");
connect();

app.use(express.json());  // request 객체 안에 있는 body를 사용하기 위해 작성. 즉, body-parser 미들웨어를 쓰기 위한 문법

app.use('/api', [goodsRouter, cartsRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버 실행');
})