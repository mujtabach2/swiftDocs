'use client';

import { useState, useEffect } from 'react';
import { optimizeResume } from '../uils/resumeOptimizer';
import { getUserResume, uploadResume } from '../uils/userService';
import { FaFileUpload, FaSync, FaRocket, FaExclamationTriangle, FaCog, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import logo from '../logo.png';
import { supabase } from '../config/supabaseClient';
import { useRouter } from 'next/navigation';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
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
  const [jobListing, setJobListing] = useState('');
  const [optimizedResume, setOptimizedResume] = useState('');
  const [resumeHtml, setResumeHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showJobListingModal, setShowJobListingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchUserResume();
    checkUser();

    let authListener;
    if (supabase && supabase.auth) {
      authListener = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
      });
    } else {
      console.error('Supabase client is not properly initialized');
    }

    return () => {
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    }
  };

  const login = () => {
    router.push('/login');
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchUserResume = async () => {
    const userResume = await getUserResume();
    setResume(userResume);
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setIsUploading(true);
      try {
        await uploadResume(file);
        await fetchUserResume();
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
      setIsUploading(false);
    }
  };

  const handleOptimizeClick = () => {
    if (user) {
      handleOptimize();
    } else {
      setShowLoginModal(true);
    }
  };

  const handleOptimize = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (!resume) {
      setShowResumeModal(true);
      return;
    }
    if (!jobListing.trim()) {
      setShowJobListingModal(true);
      return;
    }
    setIsLoading(true);
    try {
      const result = await optimizeResume(resume, jobListing);
      setOptimizedResume(result);
      setResumeHtml(result.html);
    } catch (error) {
      console.error('Error optimizing resume:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-grow flex flex-col py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full mx-auto flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center">
              <Image src={logo} alt="Logo" width={60} height={60} className="mr-4" />
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                SwiftDocs
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-green-600 font-semibold">Logged In</span>
                  <button
                    onClick={() => router.push('/settings')}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300"
                  >
                    <FaCog className="text-gray-600" />
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={login}
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>

          <div className="flex-grow flex flex-col">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden flex-grow flex flex-col">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Resume</h2>
                {resume ? (
                  <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                    <span className="text-blue-700 font-medium">{resume.name}</span>
                    <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 flex items-center">
                      <FaSync className="mr-2" />
                      Update Resume
                      <input type="file" accept=".pdf" onChange={handleResumeUpload} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-blue-500 transition duration-300">
                    <FaFileUpload className="text-5xl text-gray-400 mb-4" />
                    <span className="text-gray-600 text-lg">Upload your resume (PDF)</span>
                    <input type="file" accept=".pdf" onChange={handleResumeUpload} className="hidden" />
                  </label>
                )}
              </div>

              <div className="border-t border-gray-200 p-6 sm:p-8 flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Listing</h2>
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FaSync className="animate-spin mr-3" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <FaRocket className="mr-3" />
                      {user ? 'Optimize Now' : 'Try Optimizing (Login Required)'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {isUploading && (
            <Modal isOpen={true} onClose={() => {}} title="Uploading Resume">
              <div className="flex flex-col items-center">
                <FaSync className="animate-spin text-4xl text-blue-600 mb-4" />
                <p className="text-gray-600">Please wait while we process your resume...</p>
              </div>
            </Modal>
          )}

          <Modal
            isOpen={showResumeModal}
            onClose={() => setShowResumeModal(false)}
            title="Resume Not Found"
          >
            <div className="flex flex-col items-center">
              <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
              <p className="text-gray-600 text-center">
                Please upload a resume before attempting to optimize.
              </p>
            </div>
          </Modal>

          <Modal
            isOpen={showJobListingModal}
            onClose={() => setShowJobListingModal(false)}
            title="Job Listing Required"
          >
            <div className="flex flex-col items-center">
              <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
              <p className="text-gray-600 text-center">
                Please enter a job listing before attempting to optimize your resume.
              </p>
            </div>
          </Modal>

          <Modal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            title="Login Required"
          >
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

          {(resumeHtml || optimizedResume) && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {resumeHtml && (
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Original Resume</h2>
                    <div 
                      className="border rounded-lg p-4 max-h-96 overflow-auto"
                      dangerouslySetInnerHTML={{ __html: resumeHtml }}
                    />
                  </div>
                </div>
              )}
              {optimizedResume && (
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Optimized Resume</h2>
                    <pre className="whitespace-pre-wrap p-4 border rounded-lg bg-gray-50 text-sm overflow-auto max-h-96">
                      {optimizedResume}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}