const path = require("path")
const express = require("express")

const dotenv = require("dotenv").config()

const { errorHandler } = require("./middleware/errorMiddleware.js")

const connectDB = require("./config/db")
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", require("./routes/userRoutes.js"))
app.use("/api/products", require("./routes/productRoutes.js"))
app.use("/api/orders", require("./routes/orderRoutes.js"))

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  )
} else {
  app.get("/", (req, res) => res.send("Sunucu çalışır durumda..."))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))
