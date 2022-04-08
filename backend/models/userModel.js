const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lütfen adınızı belirtin"],
    },
    email: {
      type: String,
      required: [true, "Lütfen e-postanızı belirtin"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Lütfen şifrenizi girin"],
    },
    address: {
      type: String,
    },
    isBuyer: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
