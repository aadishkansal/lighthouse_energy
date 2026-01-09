"use client";

import React from "react";

export function AwardsSection() {
  return (
    <div className="py-10 md:py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-700 text-center ">
            Our Awards & Recognitions
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Honored for excellence in solar engineering and sustainability.
          </p>
        </div>

        {/* Grid: 2 cols on mobile/tablet, 4 cols on large */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-sm hover:shadow-xl border border-gray-100 dark:border-neutral-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-xl bg-white flex items-center justify-center">
                <img
                  src={award.src}
                  alt={award.title}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* Optional: Title text below image (remove if you strictly want ONLY images) */}
              <div className="mt-4 text-center">
                <h3 className="text-sm md:text-base font-semibold text-neutral-800 dark:text-gray-200">
                  {award.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-gray-400 mt-1">
                  {award.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ⬇️ REPLACE THESE LINKS WITH YOUR ACTUAL AWARD IMAGES
const awards = [
  {
    title: "Best Solar Startup",
    year: "2024",
    src: "https://cdn-icons-png.flaticon.com/512/3112/3112946.png", // Example placeholder
  },
  {
    title: "Excellence in Safety",
    year: "2023",
    src: "https://cdn-icons-png.flaticon.com/512/2997/2997237.png",
  },
  {
    title: "Green Energy Leader",
    year: "2023",
    src: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
  },
  {
    title: "Customer Choice Award",
    year: "2022",
    src: "https://cdn-icons-png.flaticon.com/512/1161/1161388.png",
  },
];
