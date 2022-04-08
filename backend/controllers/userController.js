const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js")

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Bütün alanları doldurun!")
  }

  // Email kayıtlı mı kontrol
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("Email zaten kullanımda!")
  }

  // Şifreyi hashleme
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Kullanıcıyı oluştur
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Geçersiz kullanıcı bilgileri")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Email kayıtlı mı kontrol
  const user = await User.findOne({ email })

  // Şifreleri karşılaştır
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      address: user.address || "",
    })
  } else {
    res.status(400)
    throw new Error("Geçersiz kullanıcı bilgileri")
  }
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(400)
    throw new Error("Kullanıcı bulunamadı!")
  }
  res.status(200).json(user)
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("Kullanıcı bulunamadı!")
  }

  const { name, address } = req.body

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedUser)
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("Kullanıcı bulunamadı!")
  }

  if (!req.user) {
    res.status(401)
    throw new Error("Önce giriş yapın!")
  }

  if (user.id.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Geçersiz işlem!")
  }

  await user.remove()

  res.status(200).json({ id: req.params.id })
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
}
