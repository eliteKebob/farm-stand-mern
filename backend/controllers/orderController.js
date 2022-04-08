const asyncHandler = require("express-async-handler")
const Order = require("../models/orderModel.js")

const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  res.status(200).json(order)
})

const setOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body

  if (
    !req.body.orderItems ||
    !req.body.shippingAddress ||
    !req.body.totalPrice
  ) {
    res.status(400)
    throw new Error("Hatalı sipariş bilgileri!")
  }
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("Sipariş verilecek ürün bulunamadı!")
  }

  const order = await Order.create({
    orderItems,
    shippingAddress,
    totalPrice,
    user: req.user._id,
  })
  res.status(200).json(order)
})

module.exports = {
  getOrder,
  setOrder,
}
