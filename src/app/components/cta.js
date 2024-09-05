import React from 'react';
import Link from 'next/link';

const CTA = ({ handleThemeChange, theme }) => {
  return (
    <section className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-primary text-white'} py-16 w-full`}>
      <div className="px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 font-comic-sans">Beat the ATS and Land More Interviews</h2>
        <p className="mb-8 max-w-3xl mx-auto font-quicksand text-lg">
          Did you know that 75% of resumes are rejected by ATS before a human ever sees them? 
          Our tool helps you optimize your resume to pass ATS scans and get into the hands of recruiters.
        </p>
        <Link 
          href="/resume-optimizer" 
          className={`${
            theme === 'dark' 
              ? 'bg-white text-gray-800 hover:bg-gray-200' 
              : 'bg-white text-primary hover:bg-secondary hover:text-white'
          } font-bold py-3 px-6 rounded-full transition duration-300 font-poppins text-lg`}
        >
          Optimize Your Resume Now
        </Link>
      </div>
    </section>
  );
};

export default CTA;