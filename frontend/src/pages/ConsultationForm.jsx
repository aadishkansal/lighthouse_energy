
import SolarConsultationForm from '../components/SolarConsultationForm'
import React from 'react'

const ConsultationForm = () => {
  return (
    <section>
      <div className="hidden lg:flex relative w-full h-screen overflow-hidden">
        <img
          src="/solar.png"
          alt="Solar Panel Background"
          className="absolute inset-0 w-full h-full object-cover block" loading="lazy" decoding="async"
        />{" "}
        <div className="absolute top-1/2 left-1/2 mt-12 -translate-x-1/2 -translate-y-1/2 w-[520px] h-auto min-h-[500px] max-h-[calc(100vh-160px)] rounded-3xl bg-black/20 backdrop-blur-md z-20 flex flex-col p-6 overflow-hidden">
          <SolarConsultationForm />
        </div>
      </div>

      <div className="lg:hidden relative h-screen w-full overflow-hidden">
        {/* 1. Image set to absolute, full width/height, and object-cover */}
        <img
          src="/solarmb.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async"
        />

        {/* 2. Content wrapper set to relative (to sit on top) and full height */}
        <div className="relative z-10 h-full w-full p-4 mt-12 flex items-center justify-center">
          <div className="w-full max-w-md bg-black/20 backdrop-blur-md rounded-3xl p-6 flex flex-col overflow-hidden max-h-[calc(100vh-120px)] min-h-[500px]">
            <SolarConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConsultationForm