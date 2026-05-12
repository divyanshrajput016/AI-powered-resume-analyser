"use client";
import React from "react";
import NavBar from "@/components/NavBar.jsx";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { useInterview } from "../../../hooks/useInterview";
import { useState, useEffect } from "react";

const page = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { handleAnalyzeResume, loading } = useInterview();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [jobDescriptionData, setJobDescriptionData] = useState("");
  const [selfDescriptionData, setSelfDescriptionData] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  
  const [isDragOver, setIsDragOver] = useState(false);

  // Navigate to reports when analysis is complete
  useEffect(() => {
    if (hasSubmitted && !loading) {
      router.push("/reports");
    }
  }, [loading, hasSubmitted, router]);

  if (!user) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg">Please log in to access this page.</p>
          <button
            className="bg-linear-to-r from-purple-500 to-pink-500 rounded-lg px-6 py-3 text-white hover:from-purple-600 hover:to-pink-600 transition duration-300"
            onClick={() => router.push("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  function analyzeResume(e) {
    e.preventDefault();
    setHasSubmitted(true);
    handleAnalyzeResume({resumeFile , selfDescriptionData , jobDescriptionData});
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setResumeFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      
      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-r-2 border-pink-500"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Generating Your Interview Strategy...
            </h2>
            <p className="text-gray-400">
              Our AI is analyzing your resume and the job description. This may take a moment.
            </p>
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Create Your Custom <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Interview Plan</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Let our AI analyze the job requirements and your unique profile to build a winning strategy.
          </p>
        </div>

        <form onSubmit={analyzeResume} className="w-full max-w-5xl">
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Left Column - Job Description & Self Description */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 backdrop-blur">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎯</span>
                  <label className="text-xl font-bold text-white">
                    Target Job Description
                  </label>
                  <span className="bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    REQUIRED
                  </span>
                </div>
                <textarea
                  value={jobDescriptionData}
                  onChange={(e) => setJobDescriptionData(e.target.value)}
                  className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                  placeholder="Paste the full job description here...
e.g., 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">👤</span>
                  <label className="text-xl font-bold text-white">
                    Quick Self-Description
                  </label>
                </div>
                <textarea
                  value={selfDescriptionData}
                  onChange={(e) => setSelfDescriptionData(e.target.value)}
                  className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                />
              </div>
            </div>

            {/* Right Column - Resume PDF & Button */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 backdrop-blur flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">📄</span>
                  <label className="text-xl font-bold text-white">
                    Upload Resume
                  </label>
                  <span className="bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    BEST RESULTS
                  </span>
                </div>
              </div>

              <div className="relative">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer ${
                    isDragOver
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">💼</div>
                    <p className="text-gray-300 font-semibold mb-2">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-sm text-gray-500">PDF or DOCX (Max 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="absolute inset-0 cursor-pointer rounded-lg" />
                </div>
              </div>

              {resumeFile && (
                <div className="mt-3 bg-gray-800 border border-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-300">
                    ✓ <span className="text-green-400">{resumeFile.name}</span>
                  </p>
                </div>
              )}

              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <span className="text-blue-400 font-semibold"> Note:</span> Either a Resume or a Self-Description is required to generate a personalized plan.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-2xl transition duration-300 transform mt-auto ${
                  loading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:from-purple-600 hover:to-pink-600 hover:scale-105'
                }`}
              >
                {loading ? "Generating..." : "⭐ Generate My Interview Strategy"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
