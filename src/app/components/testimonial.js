import React from "react";
import { FaStar } from "react-icons/fa";
import { testimonials } from "../text/testimonial";

const Testimonial = ({ theme }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={
          index < rating ? "text-[#00FA9A]" : "text-base-content opacity-30"
        }
      />
    ));
  };

  // Define theme-specific styles
  
  const bgColor = theme === "mytheme" 
    ? "bg-gradient-to-b from-white to-blue-50" 
    : "bg-gradient-to-b from-black to-gray-900";

const textColor = theme === "mytheme" ? "text-gray-900" : "text-white";
const cardBg = theme === "mytheme" ? "bg-white" : "bg-gray-800";
const cardBorder = "border-[#00FA9A]";
const cardTextColor = theme === "mytheme" ? "text-gray-800" : "text-gray-100";
const nameColor = theme === "mytheme" ? "text-gray-900" : "text-white";
const companyColor = "text-[#00FA9A]";

return (
  <section className={`w-[100vw] py-12 sm:py-20 ${bgColor}`}>
    
     <div className="container mx-auto px-4">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 ${textColor}`}>
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card ${cardBg} shadow-xl border ${cardBorder}`}
            >
              <div className="card-body p-6 sm:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  {renderStars(testimonial.rating)}
                </div>
                <p className={`${cardTextColor} mb-4 sm:mb-6 text-sm sm:text-lg`}>
                  "{testimonial.text}"
                </p>
                <p className={`font-semibold ${nameColor} text-lg sm:text-xl mb-1 sm:mb-2`}>
                  {testimonial.name}
                </p>
                <p className={`text-xs sm:text-sm ${companyColor}`}>
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;