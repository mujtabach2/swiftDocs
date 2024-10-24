"use client"; // Must be the very first line

import React, { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaFileAlt, FaArrowUp } from "react-icons/fa";
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

  useEffect(() => {
    // Fetch recent resumes
    async function fetchRecentResumes() {
      try {
        const response = await fetch("/api/recentResumes");
        if (!response.ok) {
          throw new Error("Failed to fetch recent resumes");
        }
        const resumes = await response.json();
        setRecentResumes(resumes);
      } catch (error) {
        console.error("Error fetching recent resumes:", error);
      }
    }

    fetchRecentResumes();
  }, []);

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
    <div className="w-64 bg-gray-800 text-white flex flex-col h-screen p-4">
      <div className="flex items-center mb-6">
       
        <FaUser className="text-3xl" />
    
        <div className="ml-4"> 
          
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-sm uppercase text-gray-400 mb-2">Recent Resumes</h3>
        <ul className="mb-4">
          {recentResumes.map((resume) => (
            <li key={resume.id} className="mb-2">
              <a href={`/resume/${resume.id}`} className="text-blue-300 hover:text-blue-500">
                <FaFileAlt className="inline mr-2" />
                {resume.title}
              </a>
            </li>
          ))}
        </ul>

        {loading ? (
          <p>Loading user data...</p>
        ) : user ? (
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg mt-auto"
          >
            <FaSignOutAlt className="mr-2" />
            Log Out
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg mt-auto"
          >
            <FaUser className="mr-2" />
            Log In
          </button>
        )}

        {/* Upgrade Button */}
        <button
          onClick={handleUpgrade}
          disabled={upgradeLoading}
          className={`flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg mt-4 ${
            upgradeLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaArrowUp className="mr-2" />
          {upgradeLoading ? "Processing..." : "Upgrade"}
        </button>

        {/* Display Error Message */}
        {errorMessage && (
          <p className="mt-2 text-red-500 text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
