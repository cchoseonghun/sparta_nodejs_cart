const express = require('express');
const router = express.Router();

const Goods = require("../schemas/goods");
const Cart = require('../schemas/cart');

router.post('/goods/:goodsId/cart', async (req, res) => {
  const {goodsId} = req.params;
  const {quantity} = req.body;

  const existCarts = await Cart.find({goodsId});
  if (existCarts.length) {
    return res.status(400).json({
      success: false, 
      errorMessage: '이미 장바구니에 해당하는 상품이 존재합니다.'
    })
  }

  await Cart.create({ goodsId, quantity });

  res.statue(200).json({success: true})

})

router.put('/goods/:goodsId/cart', async (req, res) => {
  const {goodsId} = req.params;
  const {quantity} = req.body;

  const existCarts = await Cart.find({goodsId});
  if (existCarts.length) {
    await Cart.updateOne(
      {goodsId: goodsId}, 
      {$set: {quantity: quantity}}, 
    )
  }
  res.status(200).json({success: true})
})

router.delete('/goods/:goodsId/cart', async (req, res) => {
 const {goodsId} = req.params;

 const existsCarts = await Cart.find({goodsId});
 if (existsCarts.length) {
  await Cart.deleteOne({goodsId});
 }
 res.status(200).json({success: true})
})

router.post("/goods", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;
  // 객체 구조 분해 할당을 통해 데이터를 가져옴

  const goods = await Goods.find({ goodsId });  // find()를 통해 goodsId에 해당하는 값 존재하는지 확인
  if (goods.length) {  // goods.length가 0보다 크면
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});

module.exports = router;