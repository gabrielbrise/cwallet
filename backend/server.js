const colors = require("colors")
const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")

// Load env vars
dotenv.config()

const app = express()

const PORT = 5000

const routes = require("./routes")

// Enable CORS
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/api/v1", routes)

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
