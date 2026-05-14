"use client";
import axios from "axios"

export async function analyzeResume({resumeFile, selfDescriptionData , jobDescriptionData}) {
    try {
        const formData = new FormData();

        formData.append("selfDescriptionData", selfDescriptionData);
        formData.append("jobDescriptionData", jobDescriptionData);

        formData.append("resume",resumeFile);
        
        const response = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/analyze`,
            formData,
            {
                withCredentials: true
            }
        )

        return response.data;
        
    } catch (error) {
        console.log("error:", error);
    }   
}