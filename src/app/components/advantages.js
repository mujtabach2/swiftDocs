import React from "react";

import {
  BeakerIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  LightBulbIcon,
  ShieldCheckIcon,
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
    title: "Privacy and security",
    description:
      "Your data is protected with industry-standard encryption. We never share or sell your personal information.",
    icon: ShieldCheckIcon,
  },
];

const Advantages = () => {
  return (
    <section className="w-[100vw] bg-gradient-to-r from-blue-50 to-indigo-50 py-20 rounded-b-[50px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Discover the <span className="text-green-600">Advantages</span> of Using
            <br />
            <span className="relative inline-block">
              <span className="text-green-600">SwiftDocs</span> Resume Optimizer 
              {/* Animated Underline */}
              <span className="absolute left-0 bottom-0 w-full h-1 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600">
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
                className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-center h-16 w-16 mb-6 bg-green-100 rounded-full">
                  <Icon className="h-8 w-8 text-green-600" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
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
