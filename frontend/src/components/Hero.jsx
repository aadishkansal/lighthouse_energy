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
          decoding="async"
        />

        {/* Text directly over image */}
        {/* Added relative z-10 to ensure text sits on top of the absolute image */}
        <div className="relative w-full h-full flex flex-col justify-center text-left px-6">
          <TypingText />
        </div>

        {/* Desktop form */}
        <div className="absolute w-[520px] h-auto min-h-[500px] max-h-[calc(100vh-160px)] top-[120px] right-0 mr-24 rounded-3xl bg-black/30 backdrop-blur-xl z-20 flex flex-col p-6 overflow-hidden border border-white/10 shadow-2xl">
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
            decoding="async"
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
