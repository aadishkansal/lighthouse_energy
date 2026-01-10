"use client";

import React from "react";
import {
  IconSun,
  IconBatteryCharging,
  IconPlugConnected,
} from "@tabler/icons-react";

export function SolarTypesSection() {
  return (
    <div className="py-20 bg-gray-50 dark:bg-neutral-900" id="solar-types">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16 mt-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-700">
            Choose Your Solar Power Style
          </h2>
          <p className="mt-4 text-lg text-neutral-600 font-base max-w-2xl mx-auto">
            We offer flexible solutions tailored to your energy needs. Whether
            you want to save on bills or go completely independent, we have a
            system for you.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solarTypes.map((type, index) => (
            <SolarCard key={index} {...type} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SolarCard({
  title,
  subtitle,
  description,
  image,
  videoId,
  features,
  icon,
}) {
  return (
    <div className="flex flex-col bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-300">
      {/* 1. Top Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md p-2 rounded-full shadow-sm text-yellow-600">
          {icon}
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500 mb-4 uppercase tracking-wider">
          {subtitle}
        </p>

        <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed text-sm">
          {description}
        </p>

        {/* Feature List */}
        <div className="space-y-3 mb-8">
          <h4 className="font-bold text-neutral-800 dark:text-neutral-200 text-sm">
            Best For:
          </h4>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start text-sm text-neutral-600 dark:text-neutral-400"
              >
                <span className="mr-2 text-green-500">✔</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* 3. YouTube Video Embed (Responsive) */}
        <div className="mt-auto pt-6 border-t border-neutral-100 dark:border-neutral-700">
          <p className="text-xs font-semibold text-neutral-500 uppercase mb-3 text-center">
            Watch Explainer
          </p>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- Data Configuration ----------------

const solarTypes = [
  {
    title: "On-Grid System",
    subtitle: "Most Popular & Cost Effective",
    description:
      "Connected directly to your local utility grid. You generate power during the day and use it. Any excess is sent back to the grid (Net Metering), earning you credits to offset night usage.",
    image: "/ongrid.png", // Placeholder
    videoId: "VFa3T2Qckx0", // ⚠️ Replace with On-Grid explainer Video ID
    icon: <IconPlugConnected size={24} />,
    features: [
      "Homes with reliable electricity",
      "Reducing electricity bills to zero",
      "Lowest upfront cost",
      "High ROI (Return on Investment)",
    ],
  },
  {
    title: "Off-Grid System",
    subtitle: "100% Independence",
    description:
      "A completely self-sufficient system that stores energy in batteries for use at night or cloudy days. You are not connected to the electricity grid at all.",
    image: "/offgrid.png", // Placeholder
    videoId: "8HPkpR1gl9E", //
    icon: <IconBatteryCharging size={24} />,
    features: [
      "Remote locations without grid access",
      "Areas with frequent power cuts",
      "Complete energy independence",
      "Backup power 24/7",
    ],
  },
  {
    title: "Hybrid System",
    subtitle: "The Best of Both Worlds",
    description:
      "Combines grid connection with battery backup. You can store cheap solar energy to use during peak hours or power outages, while still having the safety net of the grid.",
    image: "/hybrid.png", // Placeholder
    videoId: "9vM2JwrIWOU", // ⚠️ Replace with Hybrid explainer Video ID
    icon: <IconSun size={24} />,
    features: [
      "Smart energy management",
      "Backup during blackouts",
      "Optimizing Time-of-Use rates",
      "Future-proof energy security",
    ],
  },
];
