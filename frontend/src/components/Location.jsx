import { MapPin } from 'lucide-react';
import React from 'react'

const Location = () => {
  return (
    <section>
      <h1 className="flex gap-2 text-3xl md:text-4xl font-extrabold text-neutral-700 justify-center items-center mt-20 mb-12">
        Locations <MapPin />
      </h1>
      <div className="flex flex-col justify-center gap-16 items-center mb-32 ">
        <img
          src="/mp.svg"
          alt="Service Locations"
          className="flex w-2xl lg:w-3xl"
        />
        <div className="text-black font-bold text-lg text-center">
          Available in multiple locations across
          <span className="text-blue-900"> Madhya Pradesh</span>
        </div>
        <div className="text-gray-600 font-base  text-md -mt-12 text-center">
          We have a network of authorized channel partners across MP to serve
          all your solar needs.
        </div>
      </div>
    </section>
  );
}

export default Location