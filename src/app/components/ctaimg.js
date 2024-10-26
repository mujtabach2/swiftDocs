import React from "react";
import Link from "next/link";
import { scrollToPricing } from "../uils/scrollTo";

const imgCTA = () => {
  return (
    <section 
      className="py-16 sm:py-24 bg-base-100 my-0 sm:my-16 relative w-[100vw]"
    >
       <img 
        src="/left.svg" 
        alt="Left decoration" 
        className="absolute bottom-0 left-0 w-2/5" 
        style={{ zIndex: 0 }} 
      />
      <img 
        src="/right.svg" 
        alt="Right decoration" 
        className="absolute bottom-0 right-0 w-2/5" 
        style={{ zIndex: 0 }} 
      />

    </section>
  );
};

export default imgCTA;
