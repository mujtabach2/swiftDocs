import React from "react";

const companies = [
  "Company A",
  "Company B",
  "Company C",
  "Company D",
  "Company E",
  "Company F",
  "Company G",
];

const Trusted = () => {
  return (
    <div className="py-4">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold pb-4">Trusted by People from</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-center space-x-4 mb-4">
          {companies.slice(0, 4).map((company, index) => (
            <span key={index} className="px-2 py-1">
              {company}
            </span>
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          {companies.slice(4, 7).map((company, index) => (
            <span key={index} className="px-2 py-1">
              {company}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trusted;
