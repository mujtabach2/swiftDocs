import React, { useEffect, useState } from "react";
import Image from "next/image";
import harvard from "./images/harvard.png";
import uft from "./images/uft.png";
import oxford from "./images/oxford.png";
import yale from "./images/yale.png";
import icl from "./images/icl.png";

const companies = [harvard, uft, oxford, yale, icl];

const Trusted = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640); // Set breakpoint at 640px for 'sm'
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLargeScreen) return null; // Return nothing if the screen is small

  return (
    <div className="py-2 pb-20 mb-20">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold pb-4">Trusted by Students from</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-center space-x-8 mb-[-20vh]">
          {companies.map((company, index) => (
            <span key={index} className="px-4 py-2">
              <Image src={company} alt={`Company ${index + 1}`} className="w-[30vw] h-auto" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trusted;
