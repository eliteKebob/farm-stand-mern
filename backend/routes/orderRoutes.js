const express = require("express")
const router = express.Router()

const { setOrder, getOrder } = require("../controllers/orderController.js")

const { protect } = require("../middleware/authMiddleware.js")

router.route("/").post(protect, setOrder)
router.route("/:id").get(protect, getOrder)

module.exports = router
