const reportModel = require("../models/interviewReport")
const generateResumeReport = require("../service/aiService")


const pdfParse = require("pdf-parse");


async function generteReport(req,res) {
    try {

        const { selfDescriptionData, jobDescriptionData } = req.body;

        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const result = await pdfParse(file.buffer);
        let resumeDescriptionData = result.text;

        resumeDescriptionData = resumeDescriptionData.replace(/\s+/g, " ").trim();

        const interviewReportByAI = await generateResumeReport({resumeDescriptionData , selfDescriptionData , jobDescriptionData});

        await reportModel.create({
            user:req.user.id,
            jobDescription:jobDescriptionData,
            resume: resumeDescriptionData,
            selfDescription: selfDescriptionData,
            ...interviewReportByAI
        })

        res.status(200).json({ message: "Report generated successfully", report: interviewReportByAI });

        

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating report" });
    }

}

async function getAllReports(req,res) {
    try {
        const reports = await reportModel.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ reports });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching reports" });
    }
}

async function getReportById(req,res) {
    try {
        const reportId = req.params.id;
        const report = await reportModel.findOne({ _id: reportId, user: req.user.id });
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json({ report });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching report" });
    }
}

module.exports = { generteReport, getAllReports, getReportById }