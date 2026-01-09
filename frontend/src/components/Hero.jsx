import React from "react";
import SolarConsultationForm from "./SolarConsultationForm";

const Hero = () => {
  return (
    <section>
      {/* Desktop (≥1024px) */}
      {/* 1. Changed w-fit to w-full and added h-screen to force it to be exactly screen height */}
      <div className="hidden lg:flex relative w-full h-screen overflow-hidden">
        {/* 2. Added w-full, h-full, and object-cover to make the image fill the background */}
        <img
          src="/solar.png"
          alt="Solar Panel Background"
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Text directly over image */}
        {/* Added relative z-10 to ensure text sits on top of the absolute image */}
        <div className="relative z-10 w-full h-full flex flex-col gap-32 justify-center text-left px-6">
          <h2 className="font-black font-iceland text-7xl text-white leading-tight">
            Make Your <br />
            Electricity Bill * <br />
            Zero
          </h2>
          <div className="mb-5">
            <h2 className="font-semibold text-2xl mb-2 text-white leading-tight">
              Say Yes to Solar, Say Goodbye to High Bills.
            </h2>
            <h2 className="font-medium text-xl text-white/80 leading-tight">
              Get benefit by government subsidy and save upto ₹78000*
            </h2>
          </div>
        </div>

        {/* Desktop form */}
        <div className="absolute w-[480px] h-auto max-h-[600px] top-0 right-0 mt-28 mr-24 rounded-3xl bg-black/20 backdrop-blur-md z-20 p-6 flex-col">
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
            <h2 className="font-black font-iceland text-5xl mt-28 text-center text-white leading-tight">
              Make Your <br />
              Electricity Bill * <br />
              Zero
            </h2>
            <div className="mb-5">
              <h2 className="font-semibold  text-xl mb-2 text-white leading-tight">
                Say Yes to Solar, Say Goodbye to High Bills.
              </h2>
              <h2 className="font-medium text-md text-white/80 leading-tight">
                Get benefit by government subsidy and save upto ₹78000*
              </h2>
            </div>
          </div>
        </div>

        {/* FORM: Appears below the h-screen fold */}
        <div className="p-4">
          <div className="w-full max-w-md bg-black/90 backdrop-blur-md rounded-3xl p-6 flex flex-col">
            <SolarConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
