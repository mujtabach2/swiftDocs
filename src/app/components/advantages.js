import React from "react";

import {
  BeakerIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "AI-powered resume optimization",
    description:
      "Our advanced AI algorithms analyze your resume and provide tailored suggestions to highlight your strengths and match industry standards.",
    icon: BeakerIcon,
    
  },
  {
    title: "Industry-specific templates",
    description:
      "Choose from a variety of professionally designed templates tailored to your specific industry and job role.",
    icon: DocumentTextIcon,
  
  },
  {
    title: "ATS-friendly formatting",
    description:
      "Ensure your resume passes through Applicant Tracking Systems with our optimized formatting and keyword suggestions.",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    title: "Real-time feedback and scoring",
    description:
      "Receive instant feedback on your resume's strength and suggestions for improvement as you edit.",
    icon: ClockIcon,
  },
  {
    title: "Smart keyword optimization",
    description:
      "Our AI analyzes job descriptions and suggests relevant keywords to include in your resume, increasing your chances of getting noticed.",
    icon: LightBulbIcon,
  },
  {
    title: "Cover Letters & Follow-Up Emails",
    description:
      "Generate tailored cover letters and follow-up emails that align with your resume and target job, making a strong impression every step of the way.",
    icon: EnvelopeIcon,
  },
];

const Advantages = ({ theme }) => {
  // Define theme-specific styles
  const bgGradient = theme === "mytheme" ? "bg-gradient-to-r from-blue-50 to-indigo-50" : "bg-gradient-to-t from-base-100 to-black";
  const textColor = theme === "mytheme" ? "text-gray-900" : "text-white";
  const accentColor = "text-[#00FA9A]";
  const cardBg = theme === "mytheme" ? "bg-white" : "bg-gray-800";
  const cardHoverShadow = theme === "mytheme" ? "hover:shadow-xl" : "hover:shadow-[#00FA9A]/30";
  const iconBg = theme === "mytheme" ? "bg-[#00FA9A]/20" : "bg-[#00FA9A]/10";
  const iconColor = "text-[#00FA9A]";
  const cardTextColor = theme === "mytheme" ? "text-gray-800" : "text-gray-100";
  const cardDescriptionColor = theme === "mytheme" ? "text-gray-600" : "text-gray-300";

  return (
    <section className={`w-[100vw] ${bgGradient} py-20 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-extrabold ${textColor} mb-4`}>
            Discover the <span className={accentColor}>Advantages</span> of Using
            <br />
            <span className="relative inline-block">
              <span className={accentColor}>SwiftDocs</span> Resume Optimizer 
              {/* Animated Underline */}
              <span className={`absolute left-0 bottom-0 w-full h-1 ${accentColor} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></span>
            </span>
          </h2>
          <p className={`text-lg ${theme === "mytheme" ? "text-gray-600" : "text-gray-300"}`}>
            Empower your job applications with tools designed to highlight your strengths.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`${cardBg} rounded-lg shadow-md p-8 flex flex-col items-center text-center ${cardHoverShadow} transition-shadow duration-300 transform hover:-translate-y-2`}
              >
                <div className={`flex items-center justify-center h-16 w-16 mb-6 ${iconBg} rounded-full`}>
                  <Icon className={`h-8 w-8 ${iconColor}`} aria-hidden="true" />
                </div>
                <h3 className={`text-2xl font-semibold ${cardTextColor} mb-3`}>
                  {feature.title}
                </h3>
                <p className={cardDescriptionColor}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;