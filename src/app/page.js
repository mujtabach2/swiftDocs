"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./hooks/UserContext";
import Navbar from "./components/navbar";
import Main from "./components/main";
import Pricing from "./components/pricing";
import Footer from "./components/footer";
import Features from "./components/features";
import Trusted from "./components/trusted";
import ValueProp from "./components/valueProp";
import Testimonial from "./components/testimonial";
import imgCTA from "./components/ctaimg";
import FinalCTA from "./components/cta"
import ChatModal from "./components/chatModal";
import Countdown from "react-countdown";
import { motion } from "framer-motion";
import { useInView } from "./hooks/inView"; 
import ResumeSteps from "./components/resumeSteps"
import Advantages from "./components/advantages"

export default function Home() {
  const { user, loading } = useUser();
  const [theme, setTheme] = useState("mytheme");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const router = useRouter();

  // Create refs for each section
  const mainRef = useRef(null);
  const trustedRef = useRef(null);
  const valuePropRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const testimonialRef = useRef(null);
  const finalCTARef = useRef(null);

  // Intersection Observer to detect when sections come into view
  const isMainInView = useInView(mainRef);
  const isTrustedInView = useInView(trustedRef);
  const isValuePropInView = useInView(valuePropRef);
  const isFeaturesInView = useInView(featuresRef);
  const isPricingInView = useInView(pricingRef);
  const isTestimonialInView = useInView(testimonialRef);
  const isFinalCTAInView = useInView(finalCTARef);

  useEffect(() => {
    if (!loading && user) {
      router.push("/optimize");
    }
  }, [loading, user, router]);

  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "mytheme" ? "synthwave" : "mytheme"));
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const fadeInVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const bgColor = theme === "mytheme" ? "bg-white" : "bg-gray-900";

  return (
    <div className={`flex flex-col min-h-screen ${theme ? theme : "", bgColor} `} style={{bgColor}}>
      <main className="flex-grow flex flex-col items-center  p-4 sm:p-8 md:p-16 lg:p-24 ">
        <Navbar handleThemeChange={toggleTheme} theme={theme} />

        {/* Sections with scroll-triggered animations */}
        <motion.div
          ref={mainRef}
          initial="hidden"
          animate={isMainInView ? "visible" : "hidden"}
          variants={fadeInVariant}
        >
          <Main theme={theme}/>
        </motion.div>

        <motion.div
          ref={trustedRef}
          initial="hidden"
          animate={isTrustedInView ? "visible" : "hidden"}
          variants={fadeInVariant}
        >
          <Trusted theme={theme} />
        </motion.div>

        <motion.div
          ref={valuePropRef}
          initial="hidden"
          animate={isValuePropInView ? "visible" : "hidden"}
          variants={fadeInVariant}
        >
          <ValueProp theme={theme} />
        </motion.div>

        <ResumeSteps theme={theme}/>

          <Advantages theme={theme}/>
       
        <motion.section
          ref={pricingRef}
          id="pricing"
          initial="hidden"
          animate={isPricingInView ? "visible" : "hidden"}
          variants={fadeInVariant}
        >
          <Pricing theme={theme} />
        </motion.section>

      
          <Testimonial theme={theme} />
        

        <motion.div
          ref={finalCTARef}
          initial="hidden"
          animate={isFinalCTAInView ? "visible" : "hidden"}
          variants={fadeInVariant}
        >
        
          <FinalCTA theme={theme}  />
          
        </motion.div>
        <section 
  className={`sm:py-24 bg-base-100 pb-[-10vh] mb-[-13vh] mt-[-20vh] relative w-[100vw]  ${bgColor}`}
  
>
  <img 
    src="/left.svg" 
    alt="Left decoration" 
    className="absolute bottom-0 left-0 w-2/6 hidden sm:block" 
    style={{ zIndex: 0 }} 
  />
  <img 
    src="/right.svg" 
    alt="Right decoration" 
    className="absolute bottom-0 right-0 w-2/6 hidden sm:block" 
    style={{ zIndex: 0 }} 
  />
</section>


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

      <Footer theme={theme} />
    </div>
  );
}
