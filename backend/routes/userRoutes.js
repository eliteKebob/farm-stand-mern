const express = require("express")
const router = express.Router()

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js")

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/:id", getUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router
