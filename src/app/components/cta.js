import React from "react";
import Link from "next/link";
import { scrollToPricing } from "../uils/scrollTo";

const FinalCTA = ({ theme }) => {
  // Define theme-specific styles
  const bgColor = theme === "mytheme" 
    ? "bg-gradient-to-b from-blue-50 to-white" 
    : "bg-gradient-to-b from-gray-900 to-black";

  const textColor = theme === "mytheme" ? "text-gray-900" : "text-white";
  const buttonBgColor = "bg-[#00FA9A]";
  const buttonHoverBgColor = "hover:bg-[#00FA9A]/80";
  const accentColor = "text-[#00FA9A]";
  return (
    <section className={`w-[100vw] py-16 sm:py-24 ${bgColor} z-5 mb-24`}>
   
      <div className="container mx-auto px-4 text-center"  >
        <h2 className={`text-3xl sm:text-5xl font-bold mb-4 sm:mb-8 ${textColor}`}>
          Get More Interviews Today
        </h2>
        <p className={`text-lg sm:text-2xl mb-8 sm:mb-12 ${textColor} max-w-3xl mx-auto`}>
          Join thousands of job seekers who've boosted their career prospects
          with our AI-powered resume optimization.
        </p>

        <button
          onClick={scrollToPricing}
          className={`btn ${buttonBgColor} ${buttonHoverBgColor} text-black border-none btn-lg text-lg sm:text-xl px-6 sm:px-12 py-2 sm:py-4`}
        >
          Start Optimizing My Resume
        </button>
        
      </div>
    </section>
  );
};

export default FinalCTA;