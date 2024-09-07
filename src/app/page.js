"use client";
import supabase from "./config/supabaseClient";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Main from "./components/main";
import Pricing from "./components/pricing";
import Footer from "./components/footer";
import Features from "./components/features";
import Trusted from "./components/trusted";
import ValueProp from "./components/valueProp";
import Testimonial from "./components/testimonial";
import FinalCTA from "./components/cta";



export default function Home() {
  console.log(supabase);
  const [theme, setTheme] = useState("mytheme");

  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "mytheme" ? "synthwave" : "mytheme",
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center p-4 sm:p-8 md:p-16 lg:p-24">
        <Navbar handleThemeChange={toggleTheme} theme={theme} />
        
        <Main />
        <Trusted />
        <ValueProp theme={theme} />
        <Features />
        {/* <Video /> */}
        <section id="pricing" className="w-full">
          <Pricing theme={theme} />
        </section>
        <Testimonial theme={theme} />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );

// layout 
  // header
  // hero
  // value prop
  // features
  // video
  // pricing
  // testimonials
// cta
//footer
}
