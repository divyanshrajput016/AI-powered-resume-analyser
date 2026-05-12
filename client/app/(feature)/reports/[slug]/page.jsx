"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "@/components/NavBar.jsx";
import { useAuth } from "@/hooks/useAuth";

export default function ReportDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchReportDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/ai/report/${slug}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch report data");
        }

        const data = await response.json();
        setReport(data.report);
      } catch (err) {
        console.error("Error fetching report details:", err);
        setError(err.message || "Could not load report details.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchReportDetails();
    }
  }, [slug, user, router]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white">
        <NavBar />
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-r-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400 font-medium">Loading comprehensive analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="bg-black min-h-screen text-white">
        <NavBar />
        <div className="max-w-3xl mx-auto mt-20 text-center bg-gray-900 border border-gray-800 p-12 rounded-3xl">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Report Unavailable</h2>
          <p className="text-gray-400 mb-6">{error || "The report could not be found."}</p>
          <button 
            onClick={() => router.push("/reports")}
            className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition"
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400 border-green-500/30 bg-green-500/10";
    if (score >= 60) return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
    return "text-red-400 border-red-500/30 bg-red-500/10";
  };

  const getSeverityBadge = (severity) => {
    switch(severity?.toLowerCase()) {
      case 'high': return "bg-red-500/20 text-red-400 border-red-500/30";
      case 'medium': return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <NavBar />
      
      <div className="max-w-6xl mx-auto px-6 pt-10">
        {/* Header Nav */}
        <button 
          onClick={() => router.push("/reports")}
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Reports
        </button>

        {/* Top Insight Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gray-900/50 border border-gray-800 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
            <div className="relative z-10">
              <span className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-2 block">Analysis Overview</span>
              <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
                {report.role || "Resume Analysis"}
              </h1>
              <p className="text-gray-400 line-clamp-3 mb-2 text-sm leading-relaxed">
                {report.jobDescription}
              </p>
              <div className="text-xs text-gray-500">Analyzed on {new Date(report.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Match Score Card */}
          <div className={`border rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden ${getScoreColor(report.matchScore || 0)}`}>
            <div className="text-sm font-bold uppercase tracking-wider opacity-70 mb-2">Match Score</div>
            <div className="relative flex items-center justify-center">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="opacity-10" />
                <circle 
                  cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray={2 * Math.PI * 56}
                  strokeDashoffset={(2 * Math.PI * 56) * (1 - (report.matchScore || 0) / 100)}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute text-4xl font-black tracking-tighter text-white">
                {report.matchScore || 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Technical Questions */}
            {report.technicalQuestions?.length > 0 && (
              <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-2xl">💻</span> Technical Deep Dive
                </h2>
                <div className="space-y-6">
                  {report.technicalQuestions.map((q, idx) => (
                    <div key={idx} className="group bg-gray-800/30 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/30 transition">
                      <div className="p-5 bg-gray-800/20 border-b border-gray-800/50">
                        <div className="text-xs font-bold text-purple-400 mb-1">QUESTION {idx + 1}</div>
                        <h3 className="text-lg font-semibold text-white leading-snug">{q.question}</h3>
                      </div>
                      <div className="p-5 grid gap-4 text-sm">
                        <div>
                          <span className="font-bold text-gray-300 block mb-1 text-xs uppercase">Interviewer's Intent:</span>
                          <p className="text-gray-400 leading-relaxed italic">"{q.intention}"</p>
                        </div>
                        <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4">
                          <span className="font-bold text-green-400 block mb-1 text-xs uppercase">Recommended Approach / Answer:</span>
                          <p className="text-gray-300 leading-relaxed whitespace-pre-line">{q.expectedAnswer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Behavioral Questions */}
            {report.behavioralQuestions?.length > 0 && (
              <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-2xl">🤝</span> Behavioral Fit
                </h2>
                <div className="space-y-6">
                  {report.behavioralQuestions.map((q, idx) => (
                    <div key={idx} className="group bg-gray-800/30 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/30 transition">
                      <div className="p-5 bg-gray-800/20 border-b border-gray-800/50">
                        <div className="text-xs font-bold text-blue-400 mb-1">SCENARIO {idx + 1}</div>
                        <h3 className="text-lg font-semibold text-white leading-snug">{q.question}</h3>
                      </div>
                      <div className="p-5 grid gap-4 text-sm">
                        <div>
                          <span className="font-bold text-gray-300 block mb-1 text-xs uppercase">Soft Skill Evaluated:</span>
                          <p className="text-gray-400 leading-relaxed italic">"{q.intention}"</p>
                        </div>
                        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
                          <span className="font-bold text-blue-400 block mb-1 text-xs uppercase">Best Framework (STAR Method):</span>
                          <p className="text-gray-300 leading-relaxed">{q.expectedAnswer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            {/* Skill Gaps */}
            <section className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-red-500 to-orange-500"></div>
              <h2 className="text-xl font-bold mb-4">Identified Skill Gaps</h2>
              
              {(!report.skillGaps || report.skillGaps.length === 0) ? (
                <div className="text-gray-500 italic text-sm">No significant skill gaps detected! Fantastic match.</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {report.skillGaps.map((gap, i) => (
                    <div key={i} className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-2 ${getSeverityBadge(gap.severity)}`}>
                      {gap.skill}
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                      <span className="uppercase text-[9px] opacity-70">{gap.severity}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Preparation Plan */}
            {report.preparationPlan?.length > 0 && (
              <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-xl">📅</span> 7-Day Roadmap
                </h2>
                <div className="relative border-l-2 border-gray-800 ml-3 space-y-6 pb-2">
                  {report.preparationPlan.map((day, i) => (
                    <div key={i} className="relative pl-6">
                      {/* Timeline Node */}
                      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-linear-to-br from-purple-500 to-pink-500 ring-4 ring-black"></div>
                      
                      <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-800/60 hover:border-gray-700 transition">
                        <div className="text-sm font-bold text-purple-400 mb-1 uppercase tracking-wide">Day {day.day}</div>
                        <h3 className="text-md font-semibold text-white mb-3 leading-tight">{day.focusArea}</h3>
                        <ul className="space-y-2">
                          {day.tasks?.map((task, tIdx) => (
                            <li key={tIdx} className="text-sm text-gray-400 flex items-start gap-2 leading-tight">
                              <span className="text-green-500 mt-0.5 font-bold">✓</span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
