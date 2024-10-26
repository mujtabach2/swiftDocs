import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js"; 
import supabase from "../config/supabaseClient"; 
import { motion } from "framer-motion"; // Import Framer Motion// Make sure the path is correct
import { useInView } from "../hooks/inView"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const mapThemeColorToClass = (themeColor) => {
  if (themeColor === "synthwave") {
    return "bg-[#1d232a]";
  } else { 
    return "bg-gray-200";
  }
};

export default function Pricing({ theme }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for user fetch
  const [loadingStates, setLoadingStates] = useState({
    "7-day-plan": false,
    "30-day-plan": false,
    "180-day-plan": false,
  });
  const router = useRouter();
  
  const cardRefs = [useRef(null), useRef(null), useRef(null)];
  const inViewStates = cardRefs.map((ref) => useInView(ref));


  // Fetch the current user using Supabase (similar to Sidebar logic)
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    fetchUser();

    // Set up an auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handlePurchase = async (planId) => {
    if (loading) return; // Wait for loading to finish

    // Redirect to login if user is not authenticated
    if (!user) {
      console.log("User not logged in, redirecting to login.");
      router.push("/login?redirect=pricing");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [planId]: true }));

    try {
      // Send a request to the API to create the checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }), // User ID will be derived from session on the server
        credentials: "same-origin", // Ensure cookies are sent
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      // Load the Stripe.js instance and redirect to the checkout page
      const stripe = await stripePromise;

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        throw new Error("Failed to load Stripe");
      }
    } catch (error) {
      console.error("Error in handlePurchase:", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [planId]: false }));
    }
  };
  // Framer Motion variants for staggered animations
  const cardVariant = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };
  

  return (
    <div
      id="pricing"
      className="flex flex-col p-4 gap-6 justify-center sm:flex-row sm:flex-wrap sm:justify-center pt-40"
    >
      <style jsx>{`
        .blue-to-green {
          background: linear-gradient(90deg, #0d9caa, #6bba83);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blue-to-green-btn:hover {
          border: 2px solid white;
        }

        .pink-to-purple {
          background: linear-gradient(90deg, #e9507f, #5373b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .orange-to-red {
          background: linear-gradient(90deg, #f79236, #ef5079);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blue-to-green-btn {
          background: linear-gradient(90deg, #0d9caa, #6bba83);
          color: white;
        }

        .pink-to-purple-btn:hover {
          border: 2px solid white;
        }

        .pink-to-purple-btn {
          background: linear-gradient(90deg, #e9507f, #5373b8);
          color: white;
        }

        .orange-to-red-btn:hover {
          border: 2px solid white;
        }

        .orange-to-red-btn {
          background: linear-gradient(90deg, #f79236, #ef5079);
          color: white;
        }
      `}</style>
      <div className="w-full text-center mb-12">
        <h2 className="text-4xl font-extrabold  ">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-lg ">
          Select a pricing plan that fits your needs.
        </p>
      </div>

<motion.div
        ref={cardRefs[1]}
        className={`card w-full max-w-sm shadow-xl ${theme === "synthwave" ? "bg-gray-900" : "bg-white"}`}
        custom={1}
        initial="hidden"
        animate={inViewStates[1] ? "visible" : "hidden"}
        
        variants={cardVariant}
      >
        <div className="card-body p-6">
          <h2 className="card-title text-xl font-bold">7-Day Plan</h2>
          <p className="mt-2">
            <span className="text-3xl font-bold mr-1 blue-to-green">$10</span>
            <span>USD</span>
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            <li className="flex items-center"><span className="mr-2">✔</span> Unlimited documents</li>
            <li className="flex items-center"><span className="mr-2">✔</span> Access to all document types</li>
            <li className="flex items-center"><span className="mr-2">✔</span> Basic AI content suggestions</li>
          </ul>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn blue-to-green-btn w-full"
              onClick={() => handlePurchase("7-day-plan")}
              disabled={loadingStates["7-day-plan"]}
            >
              {loadingStates["7-day-plan"] ? "Processing..." : "Get 7-Day Plan"}
            </button>
            <p className="text-center mt-1 text-[0.7rem]">One-time payment. No subscription &#128515;</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={cardRefs[0]}
        className={`card w-full max-w-sm shadow-xl ${theme === "synthwave" ? "bg-gray-900" : "bg-white"} border border-2 border-[#5373b8] indicator`}
        custom={0}
        initial="hidden"
        animate={inViewStates[0] ? "visible" : "hidden"}
        variants={cardVariant}
      >
        <span className="indicator-item indicator-top border-none text-white indicator-center badge bg-gradient-to-r from-[#e9507f] to-[#5373b8]">Most Loved</span>
        <div className="card-body p-6">
          <h2 className="card-title text-xl font-bold">30-Day Plan</h2>
          <p className="mt-2">
            <span className="text-3xl font-bold pink-to-purple">$20</span> <span>USD</span>
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            <li className="flex items-center"><span className="mr-2">✔</span> Unlimited documents</li>
            <li className="flex items-center"><span className="mr-2">✔</span> Access to all document types</li>
            <li className="flex items-center"><span className="mr-2">✔</span> Personalized generation options</li>
          </ul>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn pink-to-purple-btn w-full"
              onClick={() => handlePurchase("30-day-plan")}
              disabled={loadingStates["30-day-plan"]}
            >
              {loadingStates["30-day-plan"] ? "Processing..." : "Get 30-Day Plan"}
            </button>
            <p className="text-center mt-1 text-[0.7rem]">One-time payment. No subscription &#128515;</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={cardRefs[2]}
        className={`card w-full max-w-sm shadow-xl ${theme === "synthwave" ? "bg-gray-900" : "bg-white"}`}
        custom={2}
        initial="hidden"
        animate={inViewStates[2] ? "visible" : "hidden"}
        variants={cardVariant}
      >
        <div className="card-body p-6">
          <h2 className="card-title text-xl font-bold">180-Day Plan</h2>
          <p className="mt-2">
            <span className="text-3xl font-bold orange-to-red">$99</span> <span>USD</span>
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            <li className="flex items-center"><span className="mr-2">✔</span> Unlimited documents</li>
            <li className="flex items-center"><span className="mr-2">✔</span> Access to all document types</li>
            <li className="flex items-center"><span className="mr-2">✔</span> Advanced AI content suggestions</li>
          </ul>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn orange-to-red-btn w-full"
              onClick={() => handlePurchase("180-day-plan")}
              disabled={loadingStates["180-day-plan"]}
            >
              {loadingStates["180-day-plan"] ? "Processing..." : "Get 180-Day Plan"}
            </button>
            <p className="text-center mt-1 text-[0.7rem]">One-time payment. No subscription &#128515;</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
