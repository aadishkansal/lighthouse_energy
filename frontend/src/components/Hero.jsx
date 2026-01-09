import React from "react";
import SolarConsultationForm from "./SolarConsultationForm";

import TypingText from "./ui/TypingText";


const Hero = () => {


  return (
    <section>
      {/* Desktop (≥1024px) */}
      {/* 1. Changed w-fit to w-full and added h-screen to force it to be exactly screen height */}
      <div className="hidden lg:flex relative w-full h-screen overflow-hidden">
       
        <img
          src="/solar.png"
          alt="Solar Panel Background"
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Text directly over image */}
        {/* Added relative z-10 to ensure text sits on top of the absolute image */}
        <div className="relative w-full h-full flex flex-col justify-center text-left px-6">
          <TypingText />
        </div>

        {/* Desktop form */}
        <div className="absolute w-[480px] h-auto max-h-[600px] top-0 right-0 mt-28 mr-24 mb-8 rounded-3xl bg-black/20 backdrop-blur-md z-20 p-6 flex-col">
          <SolarConsultationForm />
        </div>
      </div>
      {/* Mobile + Tablet (<1024px) */}
      <div className="lg:hidden">
        {/* WRAPPER: Needs relative positioning and defined height */}
        <div className="relative h-screen w-full">
          {/* BACKGROUND IMAGE: absolute positioning to cover the parent wrapper */}
          <img
            src="/solarmb.png"
            alt="Solar Background"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* OPTIONAL: Dark Overlay to make text readable if image is bright */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* TEXT CONTENT: relative z-10 to sit ON TOP of the image */}
          <div className="relative z-10 h-full flex flex-col gap-32 justify-center text-left px-6">
            <TypingText />
          </div>
        </div>

        {/* FORM: Appears below the h-screen fold */}
        <div className="flex p-4 justify-center">
          <div className="w-full max-w-md bg-blue-950  backdrop-blur-md rounded-3xl p-6 flex flex-col">
            <SolarConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
