"use client";
import supabase from "./config/supabaseClient";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Main from "./components/main";
import Pricing from "./components/pricing";
import Footer from "./components/footer";
import Features from "./components/features";


export default function Home() {
  console.log(supabase);
  const [theme, setTheme] = useState("synthwave");

  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "mytheme" ? "synthwave" : "mytheme",
    );
  };

  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <section id="main">
        <Navbar handleThemeChange={toggleTheme} theme={theme} />
      </section>
      
      <Main />

      <Features />

      <section id="pricing">
        <Pricing theme={theme} />
      </section>

      {/*button to login [age ] */}

      <Footer />
    </main>
    </>
  );
}
