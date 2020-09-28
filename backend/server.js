const colors = require("colors")
const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")

const app = express()

const PORT = process.env.PORT || 5000

// Enable CORS
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
