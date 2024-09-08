import React from "react";
import { FaStar } from "react-icons/fa";
import { testimonials } from "../text/testimonial";
const Testimonial = ({ theme }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={
          index < rating ? "text-[#00Fa9a]" : "text-base-content opacity-30"
        }
      />
    ));
  };

  return (
    <section className="py-12 sm:py-20 bg-base-100 my-8 sm:my-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 text-base-content">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-xl border border-[#00Fa9a]"
            >
              <div className="card-body p-6 sm:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-base-content mb-4 sm:mb-6 text-sm sm:text-lg">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-base-content text-lg sm:text-xl mb-1 sm:mb-2">
                  {testimonial.name}
                </p>
                <p className="text-xs sm:text-sm text-[#00Fa9a]">
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
