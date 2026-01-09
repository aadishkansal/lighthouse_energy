"use client";

import React from "react";
import { IconBrandYoutube } from "@tabler/icons-react"; // Optional: if you have tabler icons, or use a simple SVG

export function YoutubeCard() {
  return (
    <div className="py-10 md:py-20 bg-white dark:bg-black dark:bg-grid-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-700 text-center mb-12">
          Watch our Latest Work
        </h2>

        {/* Grid Layout: 2 cols on mobile/tablet, 4 cols on large */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {youtubeVideos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay with Red Play Button */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {/* Simple Play Icon SVG */}
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Video Title */}
              <h3 className="mt-3 text-sm md:text-lg font-semibold text-neutral-800 dark:text-gray-200 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {video.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Just add your Video IDs here
const youtubeVideos = [
  {
    id: "dQw4w9WgXcQ", // Example ID
    title: "Complete Solar Installation for Mr. Sharma",
  },
  {
    id: "LXb3EKWsInQ",
    title: "How to clean your solar panels safely",
  },
  {
    id: "nyu7o532dRw",
    title: "Lighthouse Energy: 5 Year Subsidy Plan",
  },
  {
    id: "1-yD01F9_bM",
    title: "Understanding Net Metering in India",
  },
];
