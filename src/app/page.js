"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./hooks/UserContext"; // Import the useUser hook
import supabase from "./config/supabaseClient";
import Navbar from "./components/navbar";
import Main from "./components/main";
import Pricing from "./components/pricing";
import Footer from "./components/footer";
import Features from "./components/features";
import Trusted from "./components/trusted";
import ValueProp from "./components/valueProp";
import Testimonial from "./components/testimonial";
import FinalCTA from "./components/cta";
import ChatModal from "./components/chatModal";
import Countdown from "react-countdown";

export default function Home() {
  const { user, loading } = useUser(); // Use the user context
  const [theme, setTheme] = useState("mytheme");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const router = useRouter();

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  useEffect(() => {
    // Check if user is loading
    if (loading) return;

    // If user is not authenticated, redirect to login
    if (!user) {
      //router.push("/login");
    }

    document.querySelector("body").setAttribute("data-theme", theme);
  }, [theme, user, loading, router]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "mytheme" ? "synthwave" : "mytheme"
    );
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const targetDate = new Date("2024-10-08T00:00:00-04:00").getTime(); // EST

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center p-4 sm:p-8 md:p-16 lg:p-24">
        <Navbar handleThemeChange={toggleTheme} theme={theme} />

        <Main />
        <Trusted />
        <ValueProp theme={theme} />
        <Features />
        <section id="pricing" className="w-full">
          <Pricing theme={theme} />
        </section>
        <Testimonial theme={theme} />
        <FinalCTA />

        {/* Chat button */}
        {!isChatOpen && (
          <button
            onClick={toggleChat}
            className="fixed bottom-4 right-4 bg-[#00Fa9a] text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
          >
            Chat with Us
          </button>
        )}

        {/* Chat window */}
        <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>

      <Footer />
    </div>
  );
}
