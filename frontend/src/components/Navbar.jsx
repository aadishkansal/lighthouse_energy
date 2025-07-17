"use client";
import React from "react";
import { navLinks } from "../constants";
import { Link, useLocation } from "react-router-dom";


import { ArrowUpRight } from "lucide-react";

const Navbar = () => {
   const location = useLocation();
  return (
    <nav className="flex  justify-center">
      {/* large device  */}
      <div className="hidden lg:flex  fixed justify-between z-50 mt-4 w-11/12 p-2 items-center rounded-full bg-white/10 backdrop-blur-sm">
        <div className="flex">logo</div>
        <ul className="flex bg-black/70 rounded-full py-2 ">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;

            return (
              <Link
                to={link.href}
                key={link.key}
                className={`font-medium items-center text-white mx-2 px-4 py-1 rounded-full 
              hover:border-black hover:bg-black hover:text-white hover:font-light hover:border
              ${isActive ? "border border-black bg-black text-white font-light" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </ul>
        <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <ArrowUpRight /> Go Solar
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
