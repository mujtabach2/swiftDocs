"use client";
import supabase from "./config/supabaseClient";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Main from "./components/main";
import Pricing from "./components/pricing";
import Footer from "./components/footer";
import Features from "./components/features";
import Trusted from "./components/trusted";
import ValueProp from "./components/valueProp";
import Testimonial from "./components/testimonial";
import FinalCTA from "./components/cta";
import ChatModal from "./components/chatModal";
import { useRouter } from "next/navigation";
export default function Home() {
  console.log(supabase);
  const [theme, setTheme] = useState("mytheme");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const router = useRouter();

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/optimize");
      }
    };

    checkAuth();
    document.querySelector("body").setAttribute("data-theme", theme);
  }, [theme, router]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "mytheme" ? "synthwave" : "mytheme",
    );
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center p-4 sm:p-8 md:p-16 lg:p-24">
        <Navbar handleThemeChange={toggleTheme} theme={theme} />

        <Main />
        <Trusted />
        <ValueProp theme={theme} />
        <Features />
        {/* <Video /> */}
        <section id="pricing" className="w-full">
          <Pricing theme={theme} />
        </section>
        <Testimonial theme={theme} />
        <FinalCTA />

        {/* Chat button */}
        {!isChatOpen && (
          <button
            onClick={toggleChat}
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
          >
            Chat with Us
          </button>
        )}

        {/* Settings button */}

        {/* Chat window */}
        <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>

      <Footer />
    </div>
  );

  // layout
  // header
  // hero
  // value prop
  // features
  // video
  // pricing
  // testimonials
  // cta
  //footer
}
