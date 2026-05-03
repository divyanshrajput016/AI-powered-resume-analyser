const reportModel = require("../models/interviewReport")
const generateResumeReport = require("../service/aiService")


const pdfParse = require("pdf-parse");


async function generteReport(req,res) {
    try {
        console.log(pdfParse);
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

module.exports = { generteReport }