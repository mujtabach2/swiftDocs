"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FaSync } from "react-icons/fa";
import { convertToPDF } from "../lib/api";
import supabase from "../config/supabaseClient";
import latexTemplate from '../optimize/text';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

function SearchParamsWrapper() {
  const searchParams = useSearchParams();
  const [optimizedLatex, setOptimizedLatex] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedLatex = localStorage.getItem('optimizedLatex');
    setOptimizedLatex(storedLatex)

    // Extract pdf and latex from search params
    const pdfParam = searchParams.get('pdf') || '';
  

    setPdfUrl(pdfParam);

    try {
      // Attempt to decode the latex content
      setOptimizedLatex(decodeURIComponent(latexContent)); 
    } catch (error) {
      console.error("Error decoding latex content:", error);
      // Optionally set a default value or handle the error
      setOptimizedLatex(""); // or any default value you prefer
    }
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
      console.log(newPdfUrl, newLatex) 
      setPdfUrl(data.pdfUrl);
      setOptimizedLatex(data.latexContent)
      console.log("New PDF URL:", newPdfUrl);
    } catch (error) {
      console.error('Failed to generate new PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Optimized Resume</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">LaTeX Code</h2>
            <div className="border rounded-lg overflow-hidden">
              <MonacoEditor
                height="550px"
                language="latex"
                theme="vs-dark"
                value={latexTemplate}
                onChange={setOptimizedLatex}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                }}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">PDF Preview</h2>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-[550px] border rounded-lg"
                title="PDF Preview"
              />
            ) : (
              <div className="w-full h-[550px] flex items-center justify-center border rounded-lg bg-gray-100 text-gray-500">
                PDF URL is not available
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleGenerateAgain}
            className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out shadow-md"
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
            className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 transition duration-150 ease-in-out shadow-md"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OptimizedResumePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper />
    </Suspense>
  );
}
