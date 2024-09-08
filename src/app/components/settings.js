import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

const SettingsModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchUserAndSubscription();
    }
  }, [isOpen]);

  const fetchUserAndSubscription = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);

    // Fetch subscription data from your database
    // This is just an example, adjust according to your database structure
    const { data: subscriptionData, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching subscription:", error);
    } else {
      setSubscription(subscriptionData);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      onClose(); // Close the modal after logout
      // You might want to trigger a page reload or update the app state here
      window.location.reload(); // This will reload the page, effectively redirecting to the logged-out state
    } catch (error) {
      console.error("Failed to log out", error);
    }
    setLoading(false);
  };

  const handlePauseSubscription = async () => {
    setLoading(true);
    try {
      // Implement pause subscription logic here
      console.log("Subscription paused");
    } catch (error) {
      console.error("Failed to pause subscription", error);
    }
    setLoading(false);
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      // Implement cancel subscription logic here
      console.log("Subscription cancelled");
    } catch (error) {
      console.error("Failed to cancel subscription", error);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Settings
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Account
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Email: {user?.email}
          </p>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Subscription
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Current Plan: {subscription ? subscription.plan : "No active plan"}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handlePauseSubscription}
              disabled={loading || !subscription}
              className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Processing..." : "Pause Subscription"}
            </button>
            <button
              onClick={handleCancelSubscription}
              disabled={loading || !subscription}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Processing..." : "Cancel Subscription"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
