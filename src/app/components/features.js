import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../logo.png"; 

export default function Features() {
  const [selectedResumeType, setSelectedResumeType] = useState("Professional");
  const [animate, setAnimate] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedResumeType(event.target.value);
    setAnimate(true);
  };

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 300); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <div className="flex flex-col mb-40 pb-10 mt-40 w-[100vw]">
      <style jsx>{`
        .bubble {
          font-family: "Bubbles", sans-serif;
        }
        .card-animate {
          animation: translateUp 0.3s ease-in-out;
        }
        @keyframes translateUp {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
      <h1 className="text-[3rem] mb-4 flex justify-center bubble">
        Tired of struggling with your resume?
      </h1>
      <p className="text-lg mb-4 flex justify-center">
        We've got you covered.
      </p>
      <div className="flex justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <div className="flex flex-col gap-4 items-left sm:flex-row mt-20">
        <div className=" flex-1 card ">
          <div className="flex gap-2 ">
            <select
              className="select select-success w-[10vw] ml-40 mb-10 max-w-xs"
              value={selectedResumeType}
              onChange={handleSelectChange}
            >
              <option disabled value="">
                Pick your Resume Type
              </option>
              <option value="Professional">Professional</option>
              <option value="Creative">Creative</option>
              <option value="Academic">Academic</option>
              <option value="Executive">Executive</option>
            </select>
            <div class="text-base-content/90 lg:text-lg pt-3">
              <p> — Scroll me!</p>
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="matrix(-1, 0, 0, 1, 0, 0)"
              height={50}
              className="pt-3"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M4.5 13.5L8 17L11.5 13.5"
                  stroke="#00Fa9a"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M8 17V11C8 8.79086 9.79086 7 12 7H19"
                  stroke="#00Fa9a"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="stack">
            <div
              className={`card w-96 bg-base-100 shadow-xl ${animate ? "card-animate" : ""}`}
            >
              <figure className="px-10 pt-10">
                <img
                  src="/images/resume-preview.jpg"
                  alt="Resume Preview"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{selectedResumeType} Resume</h2>
                <p>Optimized for {selectedResumeType.toLowerCase()} job seekers</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Optimize Now</button>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src="/images/resume-preview.jpg"
                  alt="Resume Preview"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{selectedResumeType} Resume</h2>
                <p>Optimized for {selectedResumeType.toLowerCase()} job seekers</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Optimize Now</button>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src="/images/resume-preview.jpg"
                  alt="Resume Preview"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{selectedResumeType} Resume</h2>
                <p>Optimized for {selectedResumeType.toLowerCase()} job seekers</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Optimize Now</button>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src="/images/resume-preview.jpg"
                  alt="Resume Preview"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{selectedResumeType} Resume</h2>
                <p>Optimized for {selectedResumeType.toLowerCase()} job seekers</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Optimize Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex-1 card justify-center items-center ">
          <ul className="space-y-[8vh] lg:w-[40vw] sm:w-[90vw]">
            <li className="flex items-center ">
              <div className="flex flex-row gap-4">
                <div>
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="-51.2 -51.2 614.40 614.40"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                      <rect
                        x="-51.2"
                        y="-51.2"
                        width="614.40"
                        height="614.40"
                        rx="307.2"
                        fill="#0d9caa"
                        strokewidth="0"
                      />
                    </g>

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>ai</title>{" "}
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        {" "}
                        <g
                          id="icon"
                          fill="#ffffff"
                          transform="translate(64.000000, 64.000000)"
                        >
                          {" "}
                          <path
                            d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z"
                            id="Combined-Shape"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
                <div>
                  <h1 className="font-bold text-xl ">
                    AI-powered resume optimization
                  </h1>
                  <p className="text-sm">
                    Our advanced AI algorithms analyze your resume and provide tailored suggestions to highlight your strengths and match industry standards.
                  </p>
                </div>
              </div>
            </li>
            <li className="flex items-center">
              <div className="flex flex-row gap-4">
                <div>
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="-3.6 -3.6 31.20 31.20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0">
                      <rect
                        x="-3.6"
                        y="-3.6"
                        width="31.20"
                        height="31.20"
                        rx="15.6"
                        fill="#e9507f"
                        strokeWidth="0"
                      />
                    </g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M23 12C23 12.3545 22.9832 12.7051 22.9504 13.051C22.3838 12.4841 21.7204 12.014 20.9871 11.6675C20.8122 6.85477 16.8555 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12C3.00683 16.8555 6.85477 20.8122 11.6675 20.9871C12.014 21.7204 12.4841 22.3838 13.051 22.9504C12.7051 22.9832 12.3545 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
                        fill="#ffffff"
                      />
                      <path
                        d="M13 11.8812L13.8426 12.3677C13.2847 12.7802 12.7902 13.2737 12.3766 13.8307L11.5174 13.3346C11.3437 13.2343 11.2115 13.0898 11.1267 12.9235C11 12.7274 11 12.4667 11 12.4667V6C11 5.44771 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V11.8812Z"
                        fill="#ffffff"
                      />
                      <path
                        d="M15.2929 17.7071C15.6834 17.3166 16.3166 17.3166 16.7071 17.7071L17.3482 18.3482L19.2473 16.4491C19.6379 16.0586 20.271 16.0586 20.6615 16.4491C21.0521 16.8397 21.0521 17.4728 20.6615 17.8634L18.1213 20.4036C18.0349 20.49 17.9367 20.5573 17.8318 20.6054C17.4488 20.8294 16.9487 20.7772 16.6203 20.4487L15.2929 19.1213C14.9024 18.7308 14.9024 18.0976 15.2929 17.7071Z"
                        fill="#ffffff"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18 24C21.3137 24 24 21.3137 24 18C24 14.6863 21.3137 12 18 12C14.6863 12 12 14.6863 12 18C12 21.3137 14.6863 24 18 24ZM18 22.0181C15.7809 22.0181 13.9819 20.2191 13.9819 18C13.9819 15.7809 15.7809 13.9819 18 13.9819C20.2191 13.9819 22.0181 15.7809 22.0181 18C22.0181 20.2191 20.2191 22.0181 18 22.0181Z"
                        fill="#ffffff"
                      />
                    </g>
                  </svg>
                </div>
                <div>
                  <h1 className="font-bold text-xl">
                    {" "}
                    Customized for your industry
                  </h1>
                  <p className="text-sm">
                    Get industry-specific recommendations to make your resume stand out. Our platform adapts to various fields, ensuring your resume speaks the right language.
                  </p>
                </div>
              </div>
            </li>

            <li className="flex items-center">
              <div className="flex flex-row gap-4">
                <div>
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="-7.68 -7.68 39.36 39.36"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g
                      id="SVGRepo_bgCarrier"
                      strokeWidth="0"
                      transform="translate(0,0), scale(1)"
                    >
                      <rect
                        x="-7.68"
                        y="-7.68"
                        width="39.36"
                        height="39.36"
                        rx="19.68"
                        fill="#f79236"
                        strokeWidth="0"
                      />
                    </g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M1 22C1 21.4477 1.44772 21 2 21H22C22.5523 21 23 21.4477 23 22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22Z"
                        fill="#ffffff"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.3056 1.87868C17.1341 0.707107 15.2346 0.707107 14.063 1.87868L3.38904 12.5526C2.9856 12.9561 2.70557 13.4662 2.5818 14.0232L2.04903 16.4206C1.73147 17.8496 3.00627 19.1244 4.43526 18.8069L6.83272 18.2741C7.38969 18.1503 7.89981 17.8703 8.30325 17.4669L18.9772 6.79289C20.1488 5.62132 20.1488 3.72183 18.9772 2.55025L18.3056 1.87868ZM15.4772 3.29289C15.8677 2.90237 16.5009 2.90237 16.8914 3.29289L17.563 3.96447C17.9535 4.35499 17.9535 4.98816 17.563 5.37868L15.6414 7.30026L13.5556 5.21448L15.4772 3.29289ZM12.1414 6.62869L4.80325 13.9669C4.66877 14.1013 4.57543 14.2714 4.53417 14.457L4.0014 16.8545L6.39886 16.3217C6.58452 16.2805 6.75456 16.1871 6.88904 16.0526L14.2272 8.71448L12.1414 6.62869Z"
                        fill="#ffffff"
                      />
                    </g>
                  </svg>
                </div>
                <div>
                  <h1 className="font-bold text-xl">
                    Real-time resume preview
                  </h1>
                  <p className="text-sm">
                    See your optimized resume in real-time as you make changes. Our platform provides instant feedback, allowing you to craft the perfect resume quickly and efficiently.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
