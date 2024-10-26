"use client"; // Must be the very first line

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaFileAlt,
  FaSignOutAlt,
  FaArrowUp,
  FaBars,
  FaTimes,
  FaHome,
  FaCog,
  FaChartLine,
} from 'react-icons/fa';

import supabase from "../config/supabaseClient";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe outside of the component to avoid recreating it on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function Sidebar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [recentResumes, setRecentResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar on small screens
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  

  useEffect(() => {
    // Fetch the current user
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Unexpected error fetching user:", error);
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();

    // Set up an auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Clean up the listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

 // Fetch recent resumes when the user is available
 useEffect(() => {
  const fetchRecentResumes = async () => {
    if (!user) {
      setRecentResumes([]);
      return;
    }

    setLoadingResumes(true);
    try {
      const folderPath = `${user.id}/`;

      // List files in the user's resume folder
      const { data, error } = await supabase
        .storage
        .from('resumes')
        .list(folderPath, {
          limit: 5, // Adjust the limit as needed
          offset: 0,
          sortBy: { column: 'name', order: 'desc' },
        });

      if (error) {
        throw error;
      }

      if (data) {
        // Generate URLs for each resume
        const resumesWithUrls = await Promise.all(
          data.map(async (file) => {
            // Assuming resumes are PDFs; adjust if necessary
            if (!file.name.endsWith('.pdf')) return null;

            const filePath = `${folderPath}${file.name}`;

            // Generate a signed URL valid for 1 hour
            const { data: urlData, error: urlError } = await supabase
              .storage
              .from('resumes')
              .createSignedUrl(filePath, 60 * 60); // 1 hour in seconds

            if (urlError) {
              console.error(`Error generating URL for file ${file.name}:`, urlError);
              return null;
            }

            return {
              id: file.name, // Using file name as ID; adjust if needed
              title: file.created_at.split('T')[0],
              url: urlData.signedUrl,
              created_at: file.created_at, // Adjust if you have metadata
            };
          })
        );

        // Filter out any null entries (non-PDFs or errors)
        const filteredResumes = resumesWithUrls.filter(resume => resume !== null);

        setRecentResumes(filteredResumes);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setRecentResumes([]);
    }
    setLoadingResumes(false);
  };

  fetchRecentResumes();
}, [user]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleUpgrade = async () => {
    setUpgradeLoading(true);
    setErrorMessage("");

    try {
      const planId = "30-day-plan"; // Choose the desired plan ID

   // Update the fetch URL in Sidebar.js
    const response = await fetch("/api/create-checkout-session", { // Removed trailing slash
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId, userId: user.id }),
    });
  
      const data = await response.json();

      if (data.error) {
        console.error("Error creating checkout session:", data.error);
        setErrorMessage(data.error);
        setUpgradeLoading(false);
        return;
      }

      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe.js failed to load.");
        setErrorMessage("Payment processing failed. Please try again later.");
        setUpgradeLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        setErrorMessage(result.error.message);
      }
    } catch (error) {
      console.error("Unexpected error during upgrade:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }

    setUpgradeLoading(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-end bg-white p-4 shadow-lg">
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
        >
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </header>

      {/* Sidebar */}
      <div
  className={`fixed inset-y-0 left-0 transform ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } md:translate-x-0 md:static md:inset-auto transition-transform duration-300 ease-in-out z-50 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col p-6 shadow-lg`}
>
  {/* User Information */}
  <div className="flex items-center mb-8">
    <div className="bg-gray-700 rounded-full p-3 flex-shrink-0">
      <FaUser className="text-3xl" aria-hidden="true" />
    </div>
    <div className="ml-4 flex-1 min-w-0">
  <p
    className="text-md font-semibold truncate overflow-hidden whitespace-nowrap flex-shrink"
    title={user?.email || 'Guest User'}
  >
    {user?.email || 'Guest User'}
  </p>
  <p className="text-sm text-gray-400">Welcome Back!</p>
</div>

  </div>
  {/* ...rest of your sidebar content */}


        {/* Navigation Links */}
        <nav className="mb-8">
          <ul className="space-y-3">
            <li>
              <a
                href="#home"
                className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaHome className="text-lg mr-3" aria-hidden="true" />
                <span className="text-sm">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/analytics"
                className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaChartLine className="text-lg mr-3" aria-hidden="true" />
                <span className="text-sm">Analytics</span>
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaCog className="text-lg mr-3" aria-hidden="true" />
                <span className="text-sm">Settings</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Recent Resumes */}
        <div className="flex-1">
          <h3 className="text-sm uppercase text-gray-400 mb-4 tracking-wider">
            Recent Resumes
          </h3>
          <ul className="space-y-3">
            {loadingResumes ? (
              <li className="text-gray-500">Loading resumes...</li>
            ) : recentResumes.length > 0 ? (
              recentResumes.map((resume) => (
                <li key={resume.id}>
                  <a
                    href={resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <FaFileAlt className="text-lg mr-3" aria-hidden="true" />
                    <span className="text-sm">{resume.title}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No resumes found.</li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          {loading ? (
            <p className="text-gray-500">Loading user data...</p>
          ) : user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <FaSignOutAlt className="mr-2" aria-hidden="true" />
              Log Out
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <FaUser className="mr-2" aria-hidden="true" />
              Log In
            </button>
          )}

          {/* Upgrade Button */}
          <button
            onClick={handleUpgrade}
            disabled={upgradeLoading}
            className={`w-full flex items-center justify-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
              upgradeLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowUp className="mr-2" aria-hidden="true" />
            {upgradeLoading ? "Processing..." : "Upgrade"}
          </button>

          {/* Display Error Message */}
          {errorMessage && (
            <p className="mt-2 text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Sidebar;

