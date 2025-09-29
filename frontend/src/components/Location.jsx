import { MapPin } from 'lucide-react';
import React from 'react'

const Location = () => {
  return (
    <section>
      <h1 className='flex gap-2 text-2xl font-bold justify-center items-center mt-12 mb-12'>Locations <MapPin/></h1>
      <div className="flex flex-col sm:flex-row justify-around gap-2 items-center mr-4 ml-4 mt-8">
        <div className="text-black font-bold text-lg text-center">
          Available in multiple locations across
          <span className="text-cyan-500"> Madhya Pradesh</span>
        </div>
        <img src="/locations.svg" alt="Service Locations" />
      </div>
    </section>
  );
}

export default Location