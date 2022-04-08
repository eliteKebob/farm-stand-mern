const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Ürünün ismini belirtin"],
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "Ürünün fiyatını belirtin"],
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["kahvaltilik", "icecek", "meyve-sebze", "kuru-gida"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Product", productSchema)
