import React from "react";
import { motion } from "framer-motion";

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
  const textColor = theme === "mytheme" ? "text-base-content" : "text-white";
  const stepBgColor = theme === "mytheme" ? "bg-[#7CFCB5]" : "bg-[#7CFCB5]";
  const stepTextColor = theme === "mytheme" ? "text-black" : "text-white";
  const buttonBgColor = theme === "mytheme" ? "bg-[#00FA9A]" : "bg-[#00FA9A]";
  const buttonHoverBgColor = theme === "mytheme" ? "hover:bg-[#00FA9A]/80" : "hover:bg-[#4a9969]/80";

  return (
    <section className={bgGradient}>
      <style jsx>{`
        @media (max-width: 768px) {
          .ressd {
            margin-left: 0;
            padding-top:10vh
          
          }
        }
      `}</style>
      <section className="w-[100vw] ressd sm:py-24 bg-base-100 mt-0 sm:my-16 relative overflow-hidden rounded-b-[50px] pb-0">
        <div className="container mx-auto items-center justify-center relative z-10 text-center">
          {/* Title */}
          <h2 className={`text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 ${textColor} text-center max-w-3xl mx-auto`}>
            Create your resume in 3 easy steps now with AI
          </h2>

          <motion.div
            className="flex flex-col items-center space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Step 1 */}
            <motion.div
              className={`${stepBgColor} ${stepTextColor} sm:ml-[0vw] ressd w-[60%] text-left p-6 rounded-lg shadow-lg transform -translate-y-6`}
              variants={stepVariant}
              style={{ zIndex: 2 }}
            >
              <div className="flex items-center">
                <div className="text-4xl sm:text-5xl mr-4">1</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                    Add your information
                  </h3>
                  <p className="text-sm sm:text-base opacity-90">
                    It's as easy as filling in the blanks. And if you ever get stuck, you can use some of our pre-made examples or turn to our AI resume builder.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className={`${stepBgColor} ${stepTextColor} sm:ml-[7vw] ressd w-[60%] text-left p-6 rounded-lg shadow-lg transform -translate-y-6`}
              variants={stepVariant}
              style={{ zIndex: 2 }}
            >
              <div className="flex items-center">
                <div className="text-4xl sm:text-5xl mr-4">2</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                    Choose the best template configuration
                  </h3>
                  <p className="text-sm sm:text-base opacity-90">
                    Each of our 200+ AI-powered resume template configurations follows strict industry guidelines and best practices.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className={`${stepBgColor} ${stepTextColor} sm:ml-[14vw] ressd w-[60%] text-left p-6 rounded-lg shadow-lg transform -translate-y-6`}
              variants={stepVariant}
              style={{ zIndex: 2 }}
            >
              <div className="flex items-center">
                <div className="text-4xl sm:text-5xl mr-4">3</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                    Click "Download"
                  </h3>
                  <p className="text-sm sm:text-base opacity-90">
                    Hit the button, and you'll instantly receive your beautiful ready-to-submit resume.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.button
            className={`btn ${buttonBgColor} my-10 mt-10 items-center ${buttonHoverBgColor} text-black border-none btn-lg text-lg sm:text-xl px-6 sm:px-12 py-2 sm:py-4 mt-1`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Build my resume with AI
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