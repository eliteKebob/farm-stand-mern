const asyncHandler = require("express-async-handler")

const Product = require("../models/productModel.js")
const User = require("../models/userModel.js")

const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.status(200).json(product)
})

const setProduct = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.category) {
    res.status(400)
    throw new Error("Ürünün bilgilerini girin!")
  }
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    user: req.user.id,
  })
  res.status(200).json(product)
})

const updateProduct = asyncHandler(async (req, res) => {
  const user = req.user.id
  const product = await Product.findById(req.params.id)
  const { name, price, category } = req.body

  if (!req.body.name || !req.body.price || !req.body.category) {
    res.status(400)
    throw new Error("Ürünün bilgilerini girin!")
  }
  if (!user) {
    res.status(400)
    throw new Error("Kullanıcı bulunamadı!")
  }

  if (!req.user) {
    res.status(401)
    throw new Error("Önce giriş yapın!")
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Geçersiz işlem!")
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )
  res.status(200).json(updatedProduct)
})

const deleteProduct = asyncHandler(async (req, res) => {
  const user = req.user.id
  const product = await Product.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("Kullanıcı bulunamadı!")
  }

  if (!req.user) {
    res.status(401)
    throw new Error("Önce giriş yapın!")
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Geçersiz işlem!")
  }

  await product.remove()

  res.status(200).json({ id: req.params.id })
})

const searchProduct = asyncHandler(async (req, res) => {
  const { query } = req.body
  const products = await Product.find({
    name: { $regex: `${query}`, $options: "i" },
  }).limit(10)
  res.status(200).json(products)
})

const searchByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category
  const products = await Product.find({
    category: { $regex: category, $options: "i" },
  }).limit(10)
  res.status(200).json(products)
})

module.exports = {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  searchByCategory,
}
