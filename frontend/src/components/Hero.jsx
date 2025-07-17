import React from "react";

const Hero = () => {
  return (
    <section>
      <div className="relative w-fit">
        <img src="/bgImg.png" alt="" className="block" />

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
        <div className="hidden lg:flex absolute w-[480px] h-[568px] top-0 right-0 mt-28 mr-24 rounded-3xl bg-black/20 backdrop-blur-md z-10 p-4 flex-col justify-between">
          {/* Tabs */}
          <div className="flex justify-between items-center bg-black p-1 rounded-full text-white mb-4">
            <button className="bg-white text-black font-semibold px-4 py-2 rounded-full">
              Residential
            </button>
            <button className="px-4 py-2">Housing Society</button>
            <button className="px-4 py-2">Commercial</button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4 text-white text-sm">
            <div>
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-1">WhatsApp Number</label>
              <input
                type="text"
                className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none"
                placeholder="Enter WhatsApp number"
              />
            </div>

            <div>
              <label className="block mb-1">Pincode</label>
              <input
                type="text"
                className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none"
                placeholder="Enter pincode"
              />
            </div>

            <div>
              <label className="block mb-2">
                What’s your average monthly bill?
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Less than ₹1500",
                  "₹1500 - ₹2500",
                  "₹2500 - ₹4000",
                  "₹4000 - ₹8000",
                  "more than ₹8000",
                ].map((label, i) => (
                  <button
                    type="button"
                    key={i}
                    className="text-white border border-white/40 rounded-full px-3 py-1 text-xs hover:bg-white hover:text-black transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center mt-2">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-xs text-white/70">
                I agree to lighthouseenergy’s{" "}
                <a href="#" className="underline">
                  terms of service
                </a>{" "}
                &{" "}
                <a href="#" className="underline">
                  privacy policy
                </a>
              </label>
            </div>

            <button className="mt-4 bg-white text-base text-black rounded-full py-3 font-semibold hover:bg-black hover:text-white transition">
              Get free consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
