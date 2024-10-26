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
    <section className="w-[100vw] sm:py-20 bg-base-100 rounded-[50px] sm:my-0 mb-0 pb-10 sm:pb-20 bg-sky-100">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between sm:mb-20">
        <div className="flex flex-col md:w-1/2 md:pr-8 mt-10 sm:mt-[10vh]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left mb-6 sm:mb-8 text-base-content">
            Supercharge Your Job Search with AI
          </h2>
          <h4 className="text-base sm:text-lg md:text-xl text-center md:text-left mb-6 sm:mb-8 text-base-content">
            Creating a job-winning resume can be a daunting task. Our resume builder makes it as easy as filling in the blanks. AI takes it a step further and fills in the blanks for you.
          </h4>
          <div className="mb-12 text-center sm:mb-20"> {/* Added margin for extra gap */}
            <button
              onClick={scrollToPricing}
              className="btn bg-[#00Fa9a] hover:bg-[#00Fa9a]/80 text-black border-none btn-lg text-base md:text-lg px-4 sm:px-6 md:px-12"
            >
              Optimize Resume
            </button>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 mb-0">
          <img src="/car.svg" alt="AI-powered resume builder" className="w-full h-auto"/>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14 mb-10 sm:mb-16">
        {features.map((feature, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            <div className="text-[#00Fa9a] flex justify-center items-center mb-4">
              {React.cloneElement(feature.icon, {
                className: "text-3xl sm:text-4xl md:text-5xl mb-4",
              })}
            </div>
            <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-2 text-base-content">
              {feature.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-base-content opacity-70">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
  
   );
};

export default ValueProp;
