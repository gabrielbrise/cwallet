const colors = require("colors")
const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")

// Load env vars
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

const routes = require("./routes")

// Enable CORS
app.use(cors())

app.use("/api/v1", routes)
app.get("/", express.static("frontend/public"))
app.use(express.static("frontend/public"))
app.use(express.static("frontend/dist"))

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
