import React from "react";
import SolarConsultationForm from "./SolarConsultationForm";

const Hero = () => {
  return (
    <section>
      {/* Desktop (≥1024px) */}
      <div className="hidden lg:flex relative w-fit">
        <img src="/solar.png" alt="" className="block" />

        {/* Text directly over image */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-32 justify-center text-left z-10 space-y-4 px-6">
          <h2 className="font-black text-5xl text-white leading-tight">
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
        <div className="absolute w-[480px] h-auto max-h-[600px] top-0 right-0 mt-28 mr-24 rounded-3xl bg-black/20 backdrop-blur-md z-10 p-6 flex-col">
          <SolarConsultationForm />
        </div>
      </div>
      

      {/* Mobile + Tablet (<1024px) */}
      <div className="lg:hidden">
        <img src="/solarcopy.png" alt="" className="block" />
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
