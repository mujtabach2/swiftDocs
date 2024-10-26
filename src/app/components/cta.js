import React from "react";
import Link from "next/link";
import { scrollToPricing } from "../uils/scrollTo";

const FinalCTA = () => {
  return (
    <section className="py-16 sm:py-24 bg-base-100 my-8 sm:my-16 relative w-[100vw]">
      <div className="container mx-auto px-4 text-center" style={{ zIndex: 5 }} >
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-8 text-base-content">
          Get More Interviews Today
        </h2>
        <p className="text-lg sm:text-2xl mb-8 sm:mb-12 text-base-content max-w-3xl mx-auto">
          Join thousands of job seekers who've boosted their career prospects
          with our AI-powered resume optimization.
        </p>

        <button
          onClick={scrollToPricing}
          className="btn bg-[#00Fa9a] hover:bg-[#00Fa9a]/80 text-black border-none btn-lg text-lg sm:text-xl px-6 sm:px-12 py-2 sm:py-4"
        >
          Start Optimizing My Resume
        </button>
        <p className="mt-6 sm:mt-8 text-base sm:text-lg text-[#00Fa9a]">
          Limited Time Free Trial Available
        </p>
      </div>
      </section>
  );
};

export default FinalCTA;