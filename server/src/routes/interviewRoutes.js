const express = require("express");
const router = express.Router();

const authUser = require("../middleware/authMiddleware")
const upload = require("../middleware/fileMiddleware")
const interviewController = require("../controller/interviewController")

router.post("/analyze", authUser, upload.single("resume") ,interviewController.generteReport)
router.get("/reports", authUser, interviewController.getAllReports)
router.get("/report/:id", authUser, interviewController.getReportById)


module.exports = router