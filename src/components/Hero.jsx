import React from "react";
import logo from "../assets/logo-1.png";

const Hero = () => {
  return (
    <header className="text-center mt-10 px-4">
      <img src={logo} alt="Kongila Logo" className="w-80 mx-auto" />

      <h1 className="text-4xl md:text-3xl font-extrabold text-kongila-blue mt-6">
        Hire Vetted Talent or Get Matched With Global Employers
      </h1>

      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        Kongila connects global employers with vetted talent from Africa, Asia, Latin
        America, and the Caribbean for full/part-time remote and project roles
      </p>

      <p className="text-black mt-3 max-w-xl mx-auto">
        Join the waitlist to experience the future of Global hiring
      </p>
    </header>
  );
};

export default Hero;
