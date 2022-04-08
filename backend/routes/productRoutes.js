const express = require("express")
const router = express.Router()

const {
  setProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
  searchByCategory,
} = require("../controllers/productController.js")

const { protect } = require("../middleware/authMiddleware.js")

router.route("/").post(protect, setProduct)
router.route("/search").post(searchProduct)
router.route("/categories/:category").get(searchByCategory)
router
  .route("/:id")
  .get(getProducts)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct)

module.exports = router
