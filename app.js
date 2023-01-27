require("dotenv/config")
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

const auth = require("./src/routes/authRoute")
const products = require("./src/routes/productRoute")
const users = require("./src/routes/userRoute")
const category = require("./src/routes/categoryRoute")
const coupon = require("./src/routes/couponRoute")
const { responseMessage } = require("./src/helper/responseMessages")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(morgan("dev"))

app.get("/", (req, res, next) => {
  res.send({
    version: "0.0.1",
    author: "Aliamat Parinduri",
  })
})

app.use("/api/v1/auth", auth)
app.use("/api/v1/products", products)
app.use("/api/v1/users", users)
app.use("/api/v1/categories", category)
app.use("/api/v1/coupons", coupon)

app.use((req, res, next) => {
  return responseError(next, 404, "Page Not Found!")
})

app.use(responseMessage)

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
)
