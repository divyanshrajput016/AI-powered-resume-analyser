require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const connectDB = require("./src/config/db")
const authRoutes = require("./src/routes/authRoutes")
const cors = require("cors")

const { selfDescriptionData, jobDescriptionData, resumeDescriptionData } = require("./src/service/temp");
const generateInterviewReport = require("./src/service/aiService")

const app = express();

app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}));


app.use(express.json())
app.use(cookieParser())

connectDB();

generateInterviewReport({selfDescriptionData, jobDescriptionData, resumeDescriptionData});

app.use("/api/auth",authRoutes)


module.exports = app