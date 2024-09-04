"use client";
// Import necessary modules
import { Auth } from "@supabase/auth-ui-react";
import supabase from "../config/supabaseClient";
import logo from "../logo.png";
import Image from "next/image";

const metadata = {
  title: "Login",
  description: "Login to access your account",
}
 

const customTheme = {
  default: {
    colors: {
      brand: "#00Fa9a",
      brandAccent: "#009688",
      brandButtonText: "white",
    },
  },
};

export default function Login() {
  const gradientBackground = {
    background: `linear-gradient(to right, #00Fa9a, #009688)`, // Gradient background
  };

  return (
    <div
      className="relative flex h-screen items-center justify-center"
      style={gradientBackground}
    >
      <div className="w-full max-w-md rounded-lg bg-gray-800 shadow-md p-8">
        <div className="flex flex-col justify-content-left ">
          <a href="/">
            <div className="flex flex-row gap-1 items-center">
              <Image src={logo} className="h-[50px] w-auto pb-2 pr-[-2vw]" />
              <h1 className="text-4xl font-bold text-white ">SwiftDocs</h1>
            </div>
          </a>

          <p className="text-white ">Sign in to access your account</p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: customTheme, // Add custom theme
            extend: true, // Extend default styles

            style: {
              button: {
                color: "white", // Text color for buttons

                borderRadius: "40px", // Optional: Add border radius
                padding: "10px 20px", // Optional: Add padding
                fontSize: "16px", // Optional: Adjust font size
                transition: "background-color 0.3s", // Add transition effect
                // Add any other button styles you need
                ":hover": {
                  // Add hover effect
                  background: "#009688", // Change background color on hover
                  shadow: "0 0 5px rgba(255, 255, 255, 0.3)", // Add box shadow on hover
                  // increase size of button on hover
                },
              },
              input: {
                backgroundColor: "#333", // Change background color to dark
                marginTop: "10px", // Padding of input
                borderColor: "#555", // Change border color to dark
                borderRadius: "40px", // Border radius of input
                padding: "10px", // Padding of input
                fontSize: "16px", // Font size of input
                color: "white", // Text color of input
                transition: "border-color 0.3s, box-shadow 0.3s", // Add transition effect
                // Add any other input styles you need
                ":hover": {
                  // Add hover effect
                  borderColor: "#777", // Change border color on hover
                  boxShadow: "0 0 5px rgba(255, 255, 255, 0.3)", // Add box shadow on hover
                },
              },
              container: {
                // Customize container styles if necessary
                borderRadius: "90px", // Add border radius
                padding: "1px", // Add padding
              },
              anchor: {
                color: "#00Fa9a", // Link color
                // Add any other anchor styles you need
              },
              // Customize styles for other elements as needed
            },
          }}
          providers={["google"]} // Add authentication providers as needed
        />
      </div>
    </div>
  );
}
