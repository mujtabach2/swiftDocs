import React from 'react';
import Link from 'next/link';
import { scrollToPricing } from '../uils/scrollTo';



const Main = () => {
  return (
    <section className="py-12 sm:py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-base-content">
            Optimize Your Resume with AI
          </h1>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-base-content max-w-3xl mx-auto">
            Get more interviews and land your dream job with our AI-powered resume optimization tool. Stand out from the competition and impress employers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={scrollToPricing} 
              className="btn bg-[#00Fa9a] hover:bg-[#00Fa9a]/80 text-black border-none btn-lg text-lg sm:text-xl px-6 sm:px-12"
            >
              Optimize Resume
            </button>
            <Link href="/learn-more" className="btn btn-outline btn-lg text-lg sm:text-xl px-6 sm:px-12">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
