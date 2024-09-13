import React from "react";
import Image from "next/image";
import harvard from "./images/harvard.png";
import uft from "./images/uft.png";
import oxford from "./images/oxford.png";
import yale from "./images/yale.png";
import icl from "./images/icl.png";

const companies = [
  harvard,
  uft,
  oxford,
  yale,
  icl,
];

const Trusted = () => {
  return (
    <div className="py-4">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold pb-4">Trusted by Students from</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-center space-x-8 mb-8">
          {companies.slice(0, 3).map((company, index) => (
            <span key={index} className="px-4 py-2">
              <Image src={company} alt={`Company ${index + 1}`} width={150} height={150} />
            </span>
          ))}
        </div>
        <div className="flex justify-center space-x-8">
          {companies.slice(3).map((company, index) => (
            <span key={index + 3} className="px-4 py-2">
              <Image src={company} alt={`Company ${index + 4}`} width={150} height={150} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trusted;
