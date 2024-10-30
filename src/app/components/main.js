import React from "react";
import Link from "next/link";
import { scrollToPricing } from "../uils/scrollTo";

const Main = ({ theme }) => {
  // Define theme-specific styles
  const bgColor = theme === "mytheme" ? "bg-white" : "bg-gray-900";
  const textColor = theme === "mytheme" ? "text-gray-900" : "text-white";
  const accentColor = "text-[#00FA9A]";
  const buttonBgColor = "bg-[#00FA9A]";
  const buttonHoverBgColor = "hover:bg-[#00FA9A]/80";
  const outlineButtonColor = theme === "mytheme" ? "btn-outline" : "btn-outline btn-accent";

  return (
    <>
      <style jsx>{`
        @keyframes moveUpDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes moveDownUp {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        .resume-move-up {
          animation: moveUpDown 5s ease-in-out infinite;
        }

        .resume-move-down {
          animation: moveDownUp 5s ease-in-out infinite;
        }

        .resume-shadow {
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
          border-radius: 40px;
        }

        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

        .custom-font {
          font-family: 'Orbitron', sans-serif;
        }

        .glow {
          color: #00fa9a;
          text-shadow:
            0 0 5px rgba(0, 250, 154, 0.6),
            0 0 10px rgba(0, 250, 154, 0.5),
            0 0 15px rgba(0, 250, 154, 0.4);
          transition: text-shadow 0.3s ease-in-out;
        }

        @media (max-width: 768px) {
          .resume-container {
            display: none;
          }

          .sce {
            margin-bottom: 30vh;
            margin-top: 10vh;
            display: flex;
            flex-direction: row;
            width: 80vw;
            justify-content: center;
            align-items: center;
            padding-left: 0vw;
          }

          .sw {
            width: 80%;
            padding-top: 5vh;
            justify-content: center;
            align-items: center;
            padding-left: 20vw;
          }
        }
      `}</style>

      <section className={`w-[100vw] py-12 sm:py-20 ${bgColor}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center sw">
            {/* Left column with text */}
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 ${textColor}`}>
                Optimize Your Resume with AI
              </h1>
              <p className={`text-lg sm:text-xl mb-8 sm:mb-12 ${textColor}`}>
                Get more interviews and land your dream job with our AI-powered
                resume optimization tool. Stand out from the competition and impress
                employers.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <button
                  onClick={scrollToPricing}
                  className={`btn ${buttonBgColor} ${buttonHoverBgColor} text-black border-none btn-lg text-lg sm:text-xl px-6 sm:px-12`}
                >
                  Optimize Resume
                </button>
                <Link
                  href="/learn-more"
                  className={`btn ${outlineButtonColor} btn-lg text-lg sm:text-xl px-6 sm:px-12`}
                >
                  Learn More
                </Link>
              </div>
               
              <div className="w-[50vw] sm:pt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center sce">
                {/* Stat Items */}
                {[
                  { title: "2X More", description: "Likely to Get an Interview" },
                  { title: "+40% More", description: "Resumes Viewed by Recruiters" },
                  { title: "×95% More", description: "Success in Passing ATS" }
                ].map((stat, index) => (
                  <div key={index} className="p-4 rounded-lg">
                    <h2 className="text-3xl text-left custom-font glow mb-0">
                      {stat.title}
                    </h2>
                    <p className={`text-sm text-left ${theme === "mytheme" ? "text-gray-700" : "text-gray-300"}`}>
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div> 
            </div>

            {/* Right column with resumes */}
            <div className="mt-[-30vh] pl-20 flex flex-row">
              <div className="md:w-3/6 flex flex-col gap-4 items-center mr-5 justify-center resume-container" style={{zIndex: 1}}>
                <div className="resume-move-up resume-shadow">
                  <img src="/resume1.jpg" alt="Resume 1" className="max-w-full h-auto rounded-lg" />
                </div>
              </div>

              <div className="md:w-3/6 flex flex-col gap-4 items-center resume-container" style={{zIndex: 1}}>
                <div className="resume-move-down resume-shadow">
                  <img src="/resume2.png" alt="Resume 2" className="max-w-full h-auto rounded-lg" />
                </div>
                <div className="resume-move-down resume-shadow">
                  <img src="/resume3.png" alt="Resume 3" className="max-w-full h-auto rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;