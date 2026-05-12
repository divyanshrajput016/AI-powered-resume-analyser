"use client";
import React, { useState, useEffect, useMemo } from "react";
import NavBar from "@/components/NavBar.jsx";
import { useInterview } from "../../../hooks/useInterview";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";

const page = () => {
  const { reports = [], report } = useInterview();
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Combine reports with newly generated report
  const allReportsData = useMemo(() => {
    return report ? [report, ...(reports || [])] : (reports || []);
  }, [report, reports]);

  // Filter reports based on search query
  const filteredReports = useMemo(() => {
    if (searchQuery.trim() === "") {
      return allReportsData;
    }
    const query = searchQuery.toLowerCase();
    return allReportsData.filter(
      (rep) =>
        rep?.role?.toLowerCase().includes(query) ||
        rep?.jobDescription?.toLowerCase().includes(query)
    );
  }, [allReportsData, searchQuery]);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination
  const totalPages = Math.ceil((filteredReports?.length || 0) / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;
  const currentReports = (filteredReports || []).slice(startIndex, endIndex);

  const getMatchScoreColor = (score) => {
    if (score >= 80) return "bg-green-500/20 text-green-400";
    if (score >= 60) return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  };

  const getSkillGapBadgeColor = (gapCount) => {
    if (gapCount <= 2) return "bg-green-500/20 text-green-400";
    if (gapCount <= 4) return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">REPORTS</h1>
          <p className="text-gray-400">Track your performance and skill gaps across all applications.</p>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex-1 min-w-80 relative">
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button className="px-4 py-2.5 border border-gray-700 rounded-lg hover:border-gray-600 transition">
            🔽 Filter
          </button>

          <button className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2.5 rounded-lg font-semibold transition transform hover:scale-105">
            📥 Download New Report
          </button>
        </div>

        {/* Reports Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur mb-8">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-800 bg-gray-800/50">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider col-span-2">TARGET ROLE & SUMMARY</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MATCH SCORE</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">SKILL GAPS</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">DATE</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">ACTION</div>
          </div>

          {/* Table Rows */}
          {(currentReports?.length || 0) > 0 ? (
            currentReports.map((rep, index) => {
              const displayRole = rep.role || "Resume Analysis";
              const displaySub = rep.jobDescription 
                ? (rep.jobDescription.substring(0, 60) + (rep.jobDescription.length > 60 ? "..." : "")) 
                : "Report";

              return (
                <div key={index} className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-800 items-center hover:bg-gray-800/30 transition">
                  {/* Job Title & Company - now Target Role */}
                  <div className="flex items-center gap-3 col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">{displayRole[0]?.toUpperCase() || "A"}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm truncate max-w-[250px]">{displayRole}</p>
                      <p className="text-gray-400 text-xs truncate max-w-[250px]">{displaySub}</p>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getMatchScoreColor(rep.matchScore || 0)}`}>
                      {rep.matchScore || "0"}%
                    </span>
                  </div>

                  {/* Skill Gaps */}
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSkillGapBadgeColor((rep?.skillGaps || []).length)}`}>
                      {(rep?.skillGaps || []).length} {(rep?.skillGaps || []).length === 1 ? "Skill" : "Skills"}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-gray-300">{formatDate(rep.createdAt)}</div>

                  {/* Action */}
                  <button
                    onClick={() => router.push(`/reports/${rep._id || index}`)}
                    className="text-purple-400 hover:text-purple-300 font-semibold text-sm transition text-left"
                  >
                    View Report →
                  </button>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-400 text-lg">No reports found. Start by analyzing a resume!</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {(filteredReports?.length || 0) > reportsPerPage && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-700 rounded-lg hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-2 rounded-lg transition ${
                    currentPage === pageNumber
                      ? "bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold"
                      : "border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {totalPages > 5 && <span className="px-2 text-gray-500">...</span>}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-700 rounded-lg hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        )}

        {/* Upskilling Section */}
        <div className="bg-linear-to-r from-slate-800 to-slate-900 border border-gray-800 rounded-2xl p-8 flex items-start gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Want to boost your match score?</h3>
            <p className="text-gray-400">
              Our AI-powered learning paths introduce your specific skill gaps and create a personalized learning plan to reach that 90+ match score.
            </p>
          </div>
          <button className="bg-linear-to-r from-blue-500 to-cyan-500 hover:bg-linear-to-r hover:from-blue-600 hover:to-cyan-600 px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shrink-0 whitespace-nowrap">
            Start Upskilling Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
