import { IconBrandFacebook, IconBrandInstagram, IconBrandInstagramFilled, IconBrandWhatsapp } from "@tabler/icons-react";
import { BuildingIcon, CalculatorIcon, FactoryIcon, HouseIcon, MailIcon, YoutubeIcon, LampFloor } from "lucide-react";
import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-white px-4 py-8 md:py-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="items-center flex">
                  <img
                    className=""
                    src="/lhelogo.png"
                    alt="logo"
                    width={200}
                    height={70}
                  />
                </div>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex flex-row gap-3 items-center mt-6">
              <a
                href="mailto:info@lighthouseenergy.in"
                className="hover:opacity-75 transition-opacity hover:pointer"
              >
                <MailIcon />
              </a>
              <a
                href="https://www.facebook.com/people/Run-on-solar/61586434318238/"
                className="hover:opacity-75 transition-opacity hover:pointer"
              >
                <IconBrandFacebook />
              </a>
              <a
                href="https://www.instagram.com/lighthouse__energy/"
                className="hover:opacity-75 transition-opacity hover:pointer"
              >
                <IconBrandInstagram />
              </a>
              <a
                href="https://www.youtube.com/@LightHouseEnergy"
                className="hover:opacity-75 transition-opacity hover:pointer"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Product Section */}
          <div className="">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Product
            </h3>
            <div className="space-y-3">
              <Link
                to="/products"
                className="flex items-center gap-2 font-medium text-base text-slate-500 hover:text-blue-600 transition-colors"
              >
                <span>
                  <HouseIcon />
                </span>
                Residential
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-2 font-medium text-base text-slate-500 hover:text-blue-600 transition-colors"
              >
                <span>
                  <BuildingIcon />
                </span>
                Housing Society
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-2 font-medium text-base text-slate-500 hover:text-blue-600 transition-colors"
              >
                <span>
                  <FactoryIcon />
                </span>
                Commercial
              </Link>
              <Link
                to="/calculator"
                className="flex items-center gap-2 font-medium text-base text-slate-500 hover:text-blue-600 transition-colors"
              >
                <span>
                  <CalculatorIcon />
                </span>
                Solar Calculator
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-2 font-medium text-base text-slate-500 hover:text-blue-600 transition-colors"
                onClick={() => {
                  window.scrollTo(0, 0);
                  // Optionally pass state if your products page handles it to default to street lights
                }}
              >
                <span>
                  <LampFloor />
                </span>
                Solar Street Lights
              </Link>
            </div>
          </div>

          {/* Company Section */}
          <div className="">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Company
            </h3>
            <div className="space-y-3">
              <Link
                to="/aboutus"
                className="block font-medium text-base text-slate-500 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/privacy"
                className="block font-medium text-base text-slate-500 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="block font-medium text-base text-slate-500 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Resources Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Contact Details
            </h3>
            <div className="space-y-3  font-medium text-base text-slate-500  ">
              <b>
                Regional Address: <br></br>
              </b>
              10’C ,Sagar High Street, Ayodhya Bypass,Bhopal (M.P)- 462041
            </div>
            <div>
              <a
                href="https://wa.me/message/G4PLTDKXGMWRA1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium text-base text-slate-500 hover:text-blue-600 transition-colors"
              >
                <span>
                  <IconBrandWhatsapp />
                </span>
                WhatsApp Support
              </a>
            </div>
            <div className="font-medium text-base text-slate-500  ">
              Contant no. - 91+ 9243663747
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-200 mt-8 pt-6">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LightHouse Energy Developers. All
          rights reserved. {" | "}
          Powered by <a href="https://builtloop.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">builtloop</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
