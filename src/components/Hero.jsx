import React from "react";
import logo from "../assets/logo-1.png";

const Hero = () => {
  return (
    <header className="text-center mt-10 px-4">
      <img src={logo} alt="Kongila Logo" className="w-80 mx-auto" />

      <h1 className="text-4xl md:text-3xl font-extrabold text-kongila-blue mt-6">
        Connecting Vetted Professionals with Global Employers
      </h1>

      <p className="text-gray-600 mt-3 max-w-xl mx-auto">
        Join the waitlist to experience the future of Global hiring
      </p>
    </header>
  );
};

export default Hero;
