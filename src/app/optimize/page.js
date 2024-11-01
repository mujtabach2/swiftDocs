// page.js
"use client";

import React, { useState, useEffect } from 'react';
import { optimizeResume, convertToPDF, handleRegeneratePDF } from "../lib/api";
import { Editor } from '@tinymce/tinymce-react'; 
import { getUserResume, uploadResume } from "../uils/userService"; // Corrected 'uils' to 'utils'
import {
  FaFileUpload,
  FaSync,
  FaRocket,
  FaExclamationTriangle,
  FaRedo, 
  FaSpinner
} from "react-icons/fa";
import Image from "next/image";
import logo from "../../../public/logo.png";
import supabase from "../config/supabaseClient";
import { useRouter } from "next/navigation";
import Sidebar from '../components/Sidebar'; // Import the Sidebar component

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function OptimizePage() {
  const [resume, setResume] = useState(null);
  const [jobListing, setJobListing] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showJobListingModal, setShowJobListingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [email, setEmail] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [optimized, setOptimized] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [selectedTemplate, setSelectedTemplate] = useState('softwareDeveloper'); // Set default template

  const router = useRouter(); 

  // Fetch user and resume on component mount
  useEffect(() => {
    const fetchUserAndResume = async () => {
      try {
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        
        console.log("Current user from auth:", currentUser);
        setUser(currentUser);

        if (currentUser) {
          await fetchUserResume();
          await checkUserPaymentStatus(currentUser.id); // Check payment status
        }
      } catch (error) {
        console.error("Error fetching user or resume:", error);
      }
    };

    fetchUserAndResume();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user);
      setUser(session?.user ?? null);
    });

    return () => {
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  // Function to download PDF
  const downloadPDF = async (pdfUrl) => {
    try {
      const response = await fetch(pdfUrl, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.pdf');
  
      document.body.appendChild(link);
      link.click();
  
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  // Countdown effect for payment modal
  useEffect(() => {
    if (showPaymentModal && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (countdown === 0) {
      router.push("/"); // Redirect to home when countdown reaches 0
    }
  }, [showPaymentModal, countdown, router]);

  // Login function
  const login = () => {
    router.push("/login");
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Fetch user's resume
  const fetchUserResume = async () => {
    if (user && user.id) {
      try {
        const userResume = await getUserResume(user.id);
        setResume(userResume);
      } catch (error) {
        console.error("Error fetching user resume:", error);
      }
    }
  };

  // Handle resume upload
  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setIsUploading(true);
      try {
        console.log("Uploading resume for user:", user.id);
        await uploadResume(file, user.id);
        await fetchUserResume();
      } catch (error) {
        console.error("Error uploading resume:", error);
        alert("Failed to upload resume");
      } finally {
        setIsUploading(false);
      }
    } else {
      alert("Please upload a PDF file.");
    }
  };

  // Handle optimize button click
  const handleOptimizeClick = async () => {
    if (user) {
      if (!resume) {
        setShowResumeModal(true);
        return;
      }
      if (!jobListing.trim()) {
        setShowJobListingModal(true);
        return;
      }
      setIsOptimizing(true);
      try {
        const optimizedResult = await optimizeResume({
          existingResume: resume.content,
          jobListing: jobListing,
          templateType: selectedTemplate, // Pass the selected templateType
        });
        const data = await convertToPDF(optimizedResult, user.id, selectedTemplate);

        setPdfUrl(data.pdfUrl);
        setHtmlContent(data.htmlContent); // Assuming defaultLatex contains HTML content
        // Set other fields as needed (coverLetter, email) if returned from API
        setCoverLetter(data.coverLetter || "No cover letter available");
        setEmail(data.followUpEmail || "No email available");
        setOptimized(true);
      } catch (error) {
        console.error("Error optimizing resume:", error);
        alert(error.message);
      } finally {
        setIsOptimizing(false);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  // Check user's payment status
  const checkUserPaymentStatus = async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("has_paid")
        .eq("id", userId)
        .single();

      if (error) throw error;

      if (!profile?.has_paid) {
        setShowPaymentModal(true);
        setTimeout(() => {
          router.push("/"); // Redirect to home page
        }, 5000);
      }
    } catch (error) {
      console.error("Error checking user payment status:", error);
    }
  };

  // Handle PDF regeneration
  const handlePDF = async () => {
    if (!pdfUrl || !selectedTemplate) return; // Ensure necessary data exists
    setIsOptimizing(true);
    try {
      const data = await handleRegeneratePDF(htmlContent, user.id, selectedTemplate);
      setPdfUrl(data.pdfUrl);
      setHtmlContent(data.htmlContent); // Update HTML content if needed
      // Update other fields if necessary
      setOptimized(true);
    } catch (error) {
      console.error("Error regenerating PDF:", error);
      alert(error.message);
    } finally {
      setIsOptimizing(false);
    }
  };

  const [copyMessage, setCopyMessage] = useState('');

  // Function to copy text and show notification
  const handleCopy = (text, type) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;
    const textContent = tempElement.textContent || tempElement.innerText || "";
    navigator.clipboard.writeText(textContent).then(() => {
      setCopyMessage(`${type} copied to clipboard!`);
    });
  };

  // Automatically hide the copy message after 2 seconds
  useEffect(() => {
    if (copyMessage) {
      const timer = setTimeout(() => setCopyMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [copyMessage]);

  // Define available templates
  const templates = [
    { value: 'softwareDeveloper', label: 'Software Developer' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    // Add more templates as needed
  ];

  return (
    <div className="min-h-screen flex flex-row bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar />
      <div className="flex-grow flex flex-col py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl w-full mx-auto flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="Logo"
                width={60}
                height={60}
                className="mr-4"
              />
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                SwiftDocs
              </h1>
            </div>
          </div>

          {/* Template Selection Dropdown */}
          <div className="mb-6">
            <label htmlFor="templateSelect" className="block text-gray-700 font-semibold mb-2">
              Select Resume Template:
            </label>
            <select
              id="templateSelect"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {templates.map((template) => (
                <option key={template.value} value={template.value}>
                  {template.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-gray-500">
              Choose a template that best fits your industry to create a professional resume.
            </p>
          </div>

          {!optimized ? (
            <div className="flex-grow flex flex-col">
              <div className="bg-white shadow-xl rounded-lg overflow-hidden flex-grow flex flex-col">
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Your Resume
                  </h2>
                  {resume ? (
                    <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                      <span className="text-blue-700 font-medium">
                        {resume.name}
                      </span>
                      <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 flex items-center">
                        <FaSync className="mr-2" />
                        Update Resume
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleResumeUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-blue-500 transition duration-300">
                      <FaFileUpload className="text-5xl text-gray-400 mb-4" />
                      <span className="text-gray-600 text-lg">
                        Upload your resume (PDF)
                      </span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleResumeUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="border-t border-gray-200 p-6 sm:p-8 flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Job Listing
                  </h2>
                  <textarea
                    className="w-full h-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    value={jobListing}
                    onChange={(e) => setJobListing(e.target.value)}
                    placeholder="Paste the job listing here"
                  />
                </div>

                <div className="bg-gray-50 px-6 py-8 sm:px-8">
                  <button
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-300"
                    onClick={handleOptimizeClick}
                    disabled={isOptimizing}
                  >
                    {isOptimizing ? (
                      <>
                        <FaSync className="animate-spin mr-3" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <FaRocket className="mr-3" />
                        {user ? "Optimize Now" : "Try Optimizing (Login Required)"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            pdfUrl && (
              <div className="mt-8 bg-white text-gray-900 rounded-lg shadow-lg p-8 space-y-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Generated Content</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[70vh]">
                  
                  {/* PDF Preview Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-gray-800">PDF Preview</h3>
                      <button 
                        onClick={() => downloadPDF(pdfUrl)} // Wrap in an anonymous function
                        className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300"
                      >
                        <FaRedo className="mr-2" />
                        Download PDF
                      </button>
                    </div>
                    
                    {isOptimizing ? (
                      <div className="flex items-center justify-center h-[60vh]">
                        <FaSpinner className="text-6xl text-blue-500 animate-spin" />
                      </div>
                    ) : (
                      <iframe
                        src={pdfUrl}
                        className="w-full h-[60vh] border rounded-lg shadow-md"
                        title="PDF Preview"
                      />
                    )}
                  </div>

                  {/* HTML Editor Section */} 
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-gray-800">Edit Resume</h3>
                      <button
                        onClick={handlePDF}
                        className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300"
                        disabled={isOptimizing}
                      >
                        <FaRedo className="mr-2" />
                        Regenerate PDF
                      </button>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                      <Editor
                         apiKey="8urqynx63y41xpv48997t2s2uw98y445xuz6zjz0ybd77ip1"
                        value={htmlContent}
                        onEditorChange={(content) => setHtmlContent(content)}
                        init={{
                          height: "60vh",  
                          menubar: false,
                          plugins: "lists link image preview",
                          toolbar: "undo redo | formatselect | bold italic | bullist numlist | link image",
                          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm relative">
                    <div dangerouslySetInnerHTML={{ __html: email }} />
                    <button
                      onClick={() => handleCopy(email, 'Email')}
                      className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 transition duration-300"
                      aria-label="Copy Email"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Cover Letter Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Cover Letter</h3>
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm relative">
                    <div dangerouslySetInnerHTML={{ __html: coverLetter }} />
                    <button
                      onClick={() => handleCopy(coverLetter, 'Cover letter')}
                      className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 transition duration-300"
                      aria-label="Copy Cover Letter"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Tooltip for copy message */}
                {copyMessage && (
                  <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-md transition duration-300">
                    {copyMessage}
                  </div>
                )}

                {/* Back Button */}
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center px-6 py-3 mt-4 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Back
                </button>
              </div>
            )
          )}

          {/* Existing Modals */}
          {isUploading && (
            <Modal isOpen={true} title="Uploading Resume">
              <div className="flex flex-col items-center">
                <FaSync className="animate-spin text-4xl text-blue-600 mb-4" />
                <p className="text-gray-600">
                  Please wait while we process your resume...
                </p>
              </div>
            </Modal>
          )}

          <Modal isOpen={showResumeModal} title="Resume Not Found" onClose={() => setShowResumeModal(false)}>
            <div className="flex flex-col items-center">
              <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
              <p className="text-gray-600 text-center">
                Please upload a resume before attempting to optimize.
              </p>
            </div>
          </Modal>

          <Modal isOpen={showJobListingModal} title="Job Listing Required" onClose={() => setShowJobListingModal(false)}>
            <div className="flex flex-col items-center">
              <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
              <p className="text-gray-600 text-center">
                Please enter a job listing before attempting to optimize your resume.
              </p>
            </div>
          </Modal>

          {/* Payment Modal */}
          <Modal
            isOpen={showPaymentModal}
            title="Subscription Required"
            onClose={() => setShowPaymentModal(true)}
          >
            <div className="flex flex-col items-center">
              <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
              <p className="text-gray-600 text-center mb-4">
                You must have a paid subscription to access this page.
              </p>
              <p className="text-gray-600 text-center mb-4">
                Redirecting to the home page in <strong>{countdown}</strong> seconds...
              </p>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  router.push("/"); // Manual redirect
                }}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Go to Home Now
              </button>
            </div>
          </Modal>

          {/* Login Modal */}
          <Modal isOpen={showLoginModal} title="Login Required" onClose={() => setShowLoginModal(false)}>
            <div className="flex flex-col items-center">
              <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
              <p className="text-gray-600 text-center mb-4">
                Please log in to optimize your resume.
              </p>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  login();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Go to Login Page
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
