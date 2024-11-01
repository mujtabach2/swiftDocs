import React from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaClipboardList, FaDownload } from "react-icons/fa"; // Importing icons from Font Awesome

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: i * 0.5 },
  }),
};

const stepVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ResumeSteps = ({ theme }) => {
  // Define theme-specific styles
  const bgGradient = theme === "mytheme" 
    ? "bg-gradient-to-b from-[white] to-[#eef6ff]" 
    : "bg-gradient-to-b from-[#1d232a] to-black";
  const textColor = theme === "mytheme" ? "text-black" : "text-white";
  const stepBgColor = theme === "mytheme" ? "bg-[#7CFCB5]" : "bg-[#7CFCB5]";
  const stepTextColor = theme === "mytheme" ? "text-black" : "text-black";
  const buttonBgColor = theme === "mytheme" ? "bg-[#00FA9A]" : "bg-[#00FA9A]";
  const buttonHoverBgColor = theme === "mytheme" ? "hover:bg-[#00FA9A]/80" : "hover:bg-[#4a9969]/80";

  return (
    <section className={bgGradient}>
      <style jsx>{`
        @media (max-width: 768px) {
          .ressd {
            margin-left: 0;
            padding-top:10vh;
          }
        }
      `}</style>
      <section className="w-[100vw] ressd sm:py-24 bg-base-100 mt-0 sm:my-16 relative overflow-hidden rounded-b-[50px] pb-0">
        <div className="container mx-auto items-center justify-center relative z-10 text-center">
          
          {/* Animated Title with Bold Text and Underline */}
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold font-handwritten mb-8 sm:mb-12 text-center max-w-3xl mx-auto px-4">
        <span className={`block ${textColor} `}>Craft Your Perfect Resume</span>
        <span className={`block mt-2 ${textColor} `}>
          in <span className="text-[#00FA9A]">3 Easy Steps</span> with{" "}
          <span className={`relative inline-block ml-1 ${textColor}`}>
            AI
            {/* Multiple Chalk-like Underline SVGs for Realism */}
            
          </span>
        </span>
      </h2>
          <motion.div
            className="flex flex-col items-center space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Step 1 */}
            <motion.div
              className={`${stepBgColor} ${stepTextColor} sm:ml-[0vw] ressd w-[60%] text-left p-6 rounded-lg shadow-lg transform -translate-y-6 hover:shadow-2xl transition-shadow`}
              variants={stepVariant}
              style={{ zIndex: 2 }}
            >
              <div className="flex items-center">
                <FaUserEdit className="text-4xl sm:text-5xl mr-4 text-white" /> {/* Icon for step 1 */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                    Effortlessly Fill Out Your Details
                  </h3>
                  <p className="text-sm sm:text-base opacity-90">
                    Simply enter your info step-by-step, or explore our ready-made examples if you need inspiration. Our AI resume builder is here to guide you.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className={`${stepBgColor} ${stepTextColor} sm:ml-[7vw] ressd w-[60%] text-left p-6 rounded-lg shadow-lg transform -translate-y-6 hover:shadow-2xl transition-shadow`}
              variants={stepVariant}
              style={{ zIndex: 2 }}
            >
              <div className="flex items-center">
                <FaClipboardList className="text-4xl sm:text-5xl mr-4 text-white" /> {/* Icon for step 2 */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                    Pick a Template That’s Just Right for You
                  </h3>
                  <p className="text-sm sm:text-base opacity-90">
                    Select from expertly designed, AI-optimized templates that follow best practices, ensuring your resume looks polished and professional.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className={`${stepBgColor} ${stepTextColor} sm:ml-[14vw] ressd w-[60%] text-left p-6 rounded-lg shadow-lg transform -translate-y-6 hover:shadow-2xl transition-shadow`}
              variants={stepVariant}
              style={{ zIndex: 2 }}
            >
              <div className="flex items-center">
                <FaDownload className="text-4xl sm:text-5xl mr-4 text-white" /> {/* Icon for step 3 */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                    Download & Launch Your Career
                  </h3>
                  <p className="text-sm sm:text-base opacity-90">
                    One click, and you’ll instantly receive your professionally formatted resume, along with a cover letter and follow-up emails ready to use.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Button */}
          <motion.button
            className={`btn ${buttonBgColor} my-10 mt-10 items-center ${buttonHoverBgColor} text-black border-none btn-lg text-lg sm:text-xl px-6 sm:px-12 py-2 sm:py-4 mt-1`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started with AI Resume Builder
          </motion.button>
        </div>

        {/* SVG Backgrounds */}
        <div className="absolute top-20 right-0 hidden sm:block">
          <img src="/topright.svg" alt="Background Decor" />
        </div>
        <div className="absolute bottom-0 left-0 hidden sm:block">
          <img src="/comp1.svg" alt="Background Decor" />
        </div>
      </section>
    </section>
  );
};

export default ResumeSteps;
