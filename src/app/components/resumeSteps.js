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

const ResumeSteps = () => {
  return (
    <section className="bg-gradient-to-b from-[white] to-[#eef6ff]">
       <style jsx>{`
     
          @media (max-width: 768px) {
              .ressd {
                margin-left: 0;
              }
                }
   
   
         `}</style>
      <section className="w-[100vw] sm:py-24 bg-base-100 my-8 sm:my-16 relative overflow-hidden rounded-b-[50px] pb-0">
        <div className="container mx-auto items-center justify-center relative z-10 text-center">
          {/* Title */}
          <h2 className="text-2xl sm:text-5xl font-bold mb-8 sm:mb-12 text-base-content text-center max-w-3xl mx-auto">
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
  className="bg-[#7CFCB5] sm:ml-[0vw]  ressd text-black w-[60%] text-left p-6 rounded-lg shadow-lg transform -translate-y-6"
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
                    It’s as easy as filling in the blanks. And if you ever get stuck, you can use some of our pre-made examples or turn to our AI resume builder.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="bg-[#7CFCB5]  sm:ml-[7vw] ressd text-black w-[60%] text-left p-6 rounded-lg shadow-lg transform -translate-y-6"
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
  className="bg-[#7CFCB5] sm:ml-[14vw] ressd text-black w-[60%] text-left p-6 rounded-lg shadow-lg transform -translate-y-6"
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
            className="btn bg-[#00FA9A] my-10 mt-10 items-center hover:bg-[#00FA9A]/80 text-black border-none btn-lg text-lg sm:text-xl px-6 sm:px-12 py-2 sm:py-4 mt-1 "
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
