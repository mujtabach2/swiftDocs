"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FaSync } from "react-icons/fa";
import supabase from "../config/supabaseClient";
import Sidebar from '../components/Sidebar';
import { convertToPDF } from "../lib/api";
import latexTemplate from '../optimize/text';

// Dynamically import MonacoEditor without SSR
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

function SearchParamsWrapper() {
  const searchParams = useSearchParams();
  const [optimizedLatex, setOptimizedLatex] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState(null);
  
  // New states for stored HTML values
  const [email, setEmail] = useState("No email available.");
  const [coverLetter, setCoverLetter] = useState("No cover letter available.");
  const [htmlContent, setHtmlContent] = useState("No additional content available.");

  useEffect(() => {
    const storedLatex = localStorage.getItem('optimizedLatex');
    setOptimizedLatex(storedLatex || latexTemplate);

    // Extract pdf from search params
    const pdfParam = searchParams.get('pdf') || '';
    setPdfUrl(pdfParam);

    // Decode LaTeX content if available
    const latexContent = searchParams.get('latex') || '';
    try {
      setOptimizedLatex(decodeURIComponent(latexContent)); 
    } catch (error) {
      console.error("Error decoding latex content:", error);
      setOptimizedLatex(latexTemplate); // Fallback to default template
    }

    // Retrieve and set the stored HTML values from localStorage
    setEmail(localStorage.getItem('email') || "");
    setCoverLetter(localStorage.getItem('coverLetter') || "");
    setHtmlContent(localStorage.getItem('htmlcon') || "");
    
  }, [searchParams]);


  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: currentUser }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(currentUser);
      }
    };

    fetchUser();
  }, []);

  const handleGenerateAgain = async () => {
    if (!optimizedLatex || !user) return;
    setIsGenerating(true);
    try {
      const data = await convertToPDF(optimizedLatex, user.id);
      setPdfUrl(data.pdfUrl);
      setOptimizedLatex(data.latexContent);
      localStorage.setItem('optimizedLatex', data.latexContent);
      console.log("New PDF URL:", data.pdfUrl);
    } catch (error) {
      console.error('Failed to generate new PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar user={user} />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl text-center mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in">Optimized Resume</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[80vh]">
            {/* LaTeX Editor */}
            <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:shadow-lg animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">LaTeX Code</h2>
              <div className="border rounded-lg overflow-hidden">
                <MonacoEditor
                  height="70vh"
                  language="latex"
                  theme="vs-dark"
                  value={optimizedLatex}
                  onChange={(value) => setOptimizedLatex(value)}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </div>

            {/* PDF Preview */}
            <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:shadow-lg animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">PDF Preview</h2>
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-[70vh] border rounded-lg"
                  title="PDF Preview"
                />
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center border rounded-lg bg-gray-50 text-gray-500">
                  PDF URL is not available
                </div>
              )}
            </div>
          </div>

          {/* New Section for Email, Cover Letter, and HTML Content */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Generated Content</h2>

            {/* Display Email */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <div
                className="p-4 border rounded-lg bg-gray-50"
                dangerouslySetInnerHTML={{ __html:email }}
              />
            </div>

            {/* Display Cover Letter */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Cover Letter</h3>
              <div
                className="p-4 border rounded-lg bg-gray-50"
                dangerouslySetInnerHTML={{ __html: coverLetter}}
              />
            </div>

            {/* Display HTML Content */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">HTML Content</h3>
              <div
                className="p-4 border rounded-lg bg-gray-50"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={handleGenerateAgain}
              className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out shadow-md 
                ${isGenerating ? "opacity-50 cursor-not-allowed" : "focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <FaSync className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <FaSync className="mr-2" />
                  Generate Again
                </>
              )}
            </button>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 transition duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchParamsWrapper;