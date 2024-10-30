"use client";

import React, { useState, useEffect } from 'react';
import { optimizeResume, convertToPDF } from "../lib/api";
import { Editor } from '@tinymce/tinymce-react'; 
import { getUserResume, uploadResume } from "../uils/userService";
import {
  FaFileUpload,
  FaSync,
  FaRocket,
  FaExclamationTriangle,
 
} from "react-icons/fa";
import Image from "next/image";
import logo from "../../../public/logo.png";
import supabase from "../config/supabaseClient";
import { useRouter } from "next/navigation";
import Sidebar from '../components/Sidebar'; // Import the Sidebar component





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
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showJobListingModal, setShowJobListingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedLatex, setOptimizedLatex] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [coverLetter, setCoverLetter] = useState("")
  const [email, setEmail] = useState("")
  const [htmlContent, setHtmlContent] = useState("")
  const [optimized, setOptimized] = useState(false)

  const router = useRouter(); 

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

  const login = () => {
    router.push("/login");
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setIsUploading(true);
      try {
        console.log("Uploading resume for user:", user.id);
        
        await uploadResume(file, user.id);
        await fetchUserResume();
        alert("Resume uploaded successfully!");
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
        });
        const data = await convertToPDF(optimizedResult, user.id);

        setPdfUrl(data.pdfUrl);
        setOptimizedLatex(data.latexContent);
        setEmail(data.followUpEmail || "No email available");
        setCoverLetter(data.coverLetter || "No cover letter available");
        setHtmlContent(data.htmlContent || "No additional content available");
        setOptimized(true)

      } catch (error) {
        console.error("Error optimizing resume:", error);
      } finally {
        setIsOptimizing(false);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const checkUserPaymentStatus = async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("has_paid")
        .eq("id", userId)
        .single();

      if (error) throw error;

      if (!profile?.has_paid) {
        alert("You must have a paid subscription to access this page.");
        router.push("/");
      }
    } catch (error) {
      console.error("Error checking user payment status:", error);
    }
  };



  return (
    <div className="min-h-screen flex flex-row bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar />
      <div className="flex-grow flex flex-col py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full mx-auto flex-grow flex flex-col">
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
              <div className="mt-8 bg-white text-black rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Generated Content</h2>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">PDF Preview</h3>
                    <iframe
                      src={pdfUrl}
                      className="w-full h-[70vh] border rounded-lg"
                      title="PDF Preview"
                    />
                  </div>
  
                  <div>
                    <h3 className="text-lg font-bold mb-2">HTML Editor</h3>
                    <Editor
                      apiKey="8urqynx63y41xpv48997t2s2uw98y445xuz6zjz0ybd77ip1"
                      value={htmlContent}
                      onEditorChange={(content) => setHtmlContent(content)}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: "lists link image preview",
                        toolbar: "undo redo | formatselect | bold italic | bullist numlist | link image",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>
                </div>
  
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-2">Email</h3>
                  <div
                    className="p-4 border rounded-lg bg-gray-50"
                    dangerouslySetInnerHTML={{ __html: email }}
                  />
                </div>
  
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-2">Cover Letter</h3>
                  <div
                    className="p-4 border text-black rounded-lg bg-gray-50"
                    dangerouslySetInnerHTML={{ __html: coverLetter }}
                  />
                </div>
              </div>
            )
          )}
  
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