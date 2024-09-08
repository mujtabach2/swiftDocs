import React from "react";
import Link from "next/link";
import { FaRobot, FaChartLine, FaUserTie } from "react-icons/fa";
import { scrollToPricing } from "../uils/scrollTo";

const ValueProp = ({ theme }) => {
  const features = [
    {
      icon: <FaRobot className="text-5xl mb-4" />,
      title: "AI-Powered Optimization",
      description:
        "Our advanced AI analyzes your resume against industry standards and job descriptions, providing tailored recommendations.",
    },
    {
      icon: <FaChartLine className="text-5xl mb-4" />,
      title: "Real-Time ATS Compatibility",
      description:
        "Instantly see how your resume performs against Applicant Tracking Systems used by 90% of employers.",
    },
    {
      icon: <FaUserTie className="text-5xl mb-4" />,
      title: "Industry-Specific Insights",
      description:
        "Get personalized suggestions based on your target industry, increasing your chances of landing interviews.",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-base-100 my-8 sm:my-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 text-base-content">
          Supercharge Your Job Search with AI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <div className="text-[#00Fa9a] flex justify-center items-center mb-4 sm:mb-6">
                {React.cloneElement(feature.icon, {
                  className: "text-4xl sm:text-5xl mb-4",
                })}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-base-content">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-base-content opacity-70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-base-content">
            Don't let your dream job slip away. Our AI-powered tool gives you
            the edge over other applicants.
          </p>

          <button
            onClick={scrollToPricing}
            className="btn bg-[#00Fa9a] hover:bg-[#00Fa9a]/80 text-black border-none btn-lg text-lg sm:text-xl px-6 sm:px-12 py-2 sm:py-4"
          >
            Start Optimizing My Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
