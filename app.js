require("dotenv/config")
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

const { responseMessage } = require("./helper/responseMessages")
const { initial } = require("./modules")

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

initial(app, express)

app.use((req, res, next) => {
  return responseError(next, 404, "Page Not Found!")
})

app.use(responseMessage)

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
)
