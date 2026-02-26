"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function Testimonial() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      {/* --- Added Heading --- */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-700 text-center mb-8 relative z-10 ">
        What our customers says?
      </h2>

      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Lighthouse Energy EPC ne hamare ghar me 3kW ka solar system install kiya. Installation bilkul smooth tha aur team ka behavior professional tha. Ab bijli ka bill almost zero ho gaya hai. Bahut hi acchi service!",
    name: "Rohit Sharma",
    title: "Bhopal",
  },
  {
    quote:
      "Main Guna se hoon aur solar ko leke pehle doubt tha. Lekin unhone proper guidance di aur subsidy process bhi handle kiya. Ab daily 12-14 units generation ho rahi hai. Fully satisfied!",
    name: "Anjali Verma",
    title: "Guna",
  },
  {
    quote:
      "Raisen me farmhouse ke liye 5kW system lagwaya. Quality of panels aur structure dono strong hain. Installation time pe complete hua aur after-sales support bhi fast hai.",
    name: "Deepak Jain",
    title: "Raisen",
  },
  {
    quote:
      "Ashoknagar me apni shop ke liye solar install karwaya. Team ne load analysis karke perfect solution diya. Electricity expense kaafi kam ho gaya hai. Paisa vasool investment.",
    name: "Sakshi Gupta",
    title: "Ashoknagar",
  },
  {
    quote:
      "Indore me 2kW rooftop solar system lagwaya. Documentation, net metering aur subsidy sab smoothly ho gaya. Team responsive hai aur kaam clean finish ke saath kiya.",
    name: "Amit Tiwari",
    title: "Indore",
  },
];