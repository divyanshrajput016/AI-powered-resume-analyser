require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const connectDB = require("./src/config/db")
const authRoutes = require("./src/routes/authRoutes")
const cors = require("cors")

const app = express();

app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}));


app.use(express.json())
app.use(cookieParser())

connectDB();

app.use("/api/auth",authRoutes)


module.exports = app