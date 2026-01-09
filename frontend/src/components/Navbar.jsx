"use client";
import React, { useState } from "react";
import { navLinks } from "../constants";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, LucideMenu, X } from "lucide-react";
import ConsultationForm from "../pages/ConsultationForm";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex justify-center">
      {/* Large device navbar */}
      <div className="hidden lg:flex fixed justify-between z-50 mt-4 w-11/12 p-2 items-center rounded-full bg-white/10 backdrop-blur-sm">
        <div className="flex">
          <img
            src="/lhelogo.png"
            alt="logo"
            width={150}
            className="ml-12"
          />
        </div>
        <ul className="flex bg-black/70 rounded-full py-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                to={link.href}
                key={link.key}
                className={`font-medium items-center text-white mx-2 px-4 py-1 rounded-full 
                  hover:border-black hover:bg-white hover:text-black hover:font-medium hover:transition
                  ${isActive ? "border border-white bg-black font-light" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </ul>
        <button
          onClick={() => navigate("/consultationForm")}
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <ArrowUpRight className="w-4 h-4 mr-1" /> Go Solar
          </span>
        </button>
      </div>

      {/* Mobile device navbar */}
      <div className="lg:hidden fixed top-3 z-50 w-full flex justify-center">
        <div className="w-[360px] sm:w-[620px] flex justify-between items-center p-2 bg-white/10 backdrop-blur-sm rounded-full">
          <div className="ml-4">
            
            <img src="/lhelogo.png" alt="logo" width={140}/>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-black p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <LucideMenu className="w-7 h-7 text-blue-800" />
            
          </button>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          >
            <div
              className="bg-white/20 backdrop-blur-md w-screen min-h-screen pt-20 relative" // Added relative for positioning
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button inside overlay */}
              <button
                onClick={closeMobileMenu}
                className="absolute top-8 right-12 text-black p-2 hover:bg-white/10 rounded-lg transition-colors z-50" // Positioned at top-right
                aria-label="Close menu"
              >
                <X color="white" className="w-6 h-6" />
              </button>

              {/* Navigation links */}
              <div className="flex px-6 py-4 justify-center">
                <ul className="space-y-6">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.href;
                    return (
                      <li key={link.key}>
                        <Link
                          to={link.href}
                          onClick={closeMobileMenu}
                          className={`block w-full px-4 py-3 rounded-lg text-lg font-medium transition-all
                            ${isActive ? "bg-black text-white" : "text-white hover:bg-black/10"}`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Mobile CTA button */}
              <div className="px-6 py-4 mt-8">
                <button
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/consultationForm");
                  }}
                  className="w-full relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-lg font-medium text-white backdrop-blur-3xl">
                    <ArrowUpRight className="w-5 h-5 mr-2" /> Go Solar
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
