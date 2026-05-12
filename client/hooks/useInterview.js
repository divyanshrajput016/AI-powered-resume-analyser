"use client";
import { useContext } from "react";
import { interviewContext } from "../context/interview.context"
import { analyzeResume } from "../services/ai.api";

export const useInterview = () => {
    const context = useContext(interviewContext);
    const {loading , setLoading , report , setReport, triggerRefetch, reports} = context;
    
    const handleAnalyzeResume = async({resumeFile , selfDescriptionData , jobDescriptionData}) => {
        try {
            setLoading(true);
            const data = await analyzeResume({resumeFile , selfDescriptionData , jobDescriptionData});
            setReport(data);
            triggerRefetch();
        } catch (error) {
            console.log("Error analyzing resume:", error);
        } finally {            
            setLoading(false);
        }
    }

    return { loading, report, handleAnalyzeResume, reports };
}