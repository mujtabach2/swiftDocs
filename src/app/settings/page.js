"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use for navigation after cancellation

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch the current subscription status on page load
    async function fetchSubscription() {
      try {
        const res = await fetch("/api/subscription-status", { method: "GET" });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setSubscription(data.subscription);
        }
      } catch (err) {
        setError("Failed to load subscription status.");
      }
    }

    fetchSubscription();
  }, []);

  // Function to cancel the user's subscription
  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cancel-subscription", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        alert("Subscription canceled successfully.");
        router.push("/"); // Redirect to homepage after cancellation
      }
    } catch (err) {
      setError("Error canceling subscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Settings</h1>

      {error && <p className="text-red-500">{error}</p>}

      {subscription ? (
        <div>
          <p>Current plan: {subscription.plan}</p>
          <p>Status: {subscription.status}</p>
          <button
            onClick={handleCancelSubscription}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Cancelling..." : "Cancel Subscription"}
          </button>
        </div>
      ) : (
        <p>Loading subscription details...</p>
      )}
    </div>
  );
}
