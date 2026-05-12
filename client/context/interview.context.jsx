"use client";

import { useState, createContext, useEffect } from "react";

export const interviewContext = createContext();


export const InterviewProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])
    const [refetchTrigger, setRefetchTrigger] = useState(0)

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/ai/reports", {
                    method: "GET",
                    credentials: "include"
                });
                const data = await response.json();
                setReports(data.reports || []);
            } catch (error) {
                console.error("Error fetching reports:", error);
                setReports([]);
            }
        };

        fetchReports();
    }, [refetchTrigger]);
    
    const triggerRefetch = () => {
        setRefetchTrigger(prev => prev + 1);
    };
    
    return (
        <interviewContext.Provider value={{loading , setLoading , report , setReport , reports , setReports, triggerRefetch }}>
            {children}
        </interviewContext.Provider>
    )
}

