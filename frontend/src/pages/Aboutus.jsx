import React from 'react'

const Aboutus = () => {
  return (
    <section className="space-y-6 mt-24">
      <div>
        <h1 className="font-extrabold text-3xl text-center">About us</h1>
      </div>

      <div>
        <p className="font-light text-base text-center mr-10 ml-10">
          At Lighthouse Energy, we are dedicated to bringing affordable,
          high-quality solar power solutions to homes. Founded with a mission to
          make solar energy accessible and efficient, we focus on reducing
          electricity costs, enhancing energy independence, and promoting a
          sustainable future.
        </p>
      </div>
      <div>
        <p className="font-light text-base text-center mr-10 ml-10">
          Our expert team combines premium solar panels, competitive pricing,
          and exceptional customer service with fast, professional installation.
          We believe in empowering communities to embrace clean energy without
          compromises. Join us in lighting up homes and transforming the way
          India powers its future.
        </p>
      </div>
      <div className="max-w-6xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold mb-10 text-center">Founder & Team</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12">
          {/* Founder */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <img
              src="/images/team1.jpg"
              alt="Team Member Photo"
              className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
            />
            <h3 className="text-lg font-semibold">Neeraj Jain</h3>
            <p className="text-gray-600 mt-1">Chief Technical Officer</p>
          </div>

          {/* Team Member 1 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <img
              src="/images/team1.jpg"
              alt="Team Member Photo"
              className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
            />
            <h3 className="text-lg font-semibold">Neeraj Jain</h3>
            <p className="text-gray-600 mt-1">Chief Technical Officer</p>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <img
              src="/images/team2.jpg"
              alt="Team Member Photo"
              className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
            />
            <h3 className="text-lg font-semibold">Nikhil Nahar</h3>
            <p className="text-gray-600 mt-1">Operations Head</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aboutus