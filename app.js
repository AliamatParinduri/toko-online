require('dotenv/config')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const auth = require('./src/routes/auth_route')
const products = require('./src/routes/product_route')
const users = require('./src/routes/user_route')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(helmet())
app.use(morgan("dev"))

app.get("/", (req, res, next) => {
  res.send({
    version: "0.0.1",
    author: "Aliamat Parinduri"
  })
})

app.use('/api/v1/auth', auth)
app.use('/api/v1/products', products)
app.use('/api/v1/users', users)

app.use((req, res, next) => {
  const err = new Error("Page not found!")
  err.StatusCode = 404;
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.StatusCode || 500).send(err.message)
})

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))