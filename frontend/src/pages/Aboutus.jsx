import React from 'react';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';

const Aboutus = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 mt-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative">
               <img src="/solar.png" alt="Solar Panels" className="w-full h-auto object-cover" />
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
            </div>
          </div>
          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="font-extrabold text-2xl md:text-3xl text-blue-950">About Us</h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              At Lighthouse Energy EPC, we are committed to delivering affordable, reliable, and high-quality solar power solutions for homes and businesses across Madhya Pradesh. Our mission is simple — to make clean energy accessible, cost-effective, and hassle-free for every household.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Founded with a vision to accelerate India’s transition to renewable energy, we help families reduce electricity bills, achieve energy independence, and contribute to a greener, more sustainable future. We believe solar energy is not just an investment — it’s a smart lifestyle upgrade.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
           <h2 className="font-extrabold text-2xl md:text-3xl text-blue-950 mb-6">Our Approach</h2>
           <p className="text-gray-700 text-base md:text-lg leading-relaxed">
             Our experienced team handles everything end-to-end — from site inspection and load analysis to system design, subsidy guidance, net metering documentation, and professional installation. We use premium-quality solar panels, durable mounting structures, and high-efficiency inverters to ensure maximum generation and long-term performance.
           </p>
           <p className="text-gray-700 text-base md:text-lg leading-relaxed">
             With competitive pricing, transparent processes, and strong after-sales support, Lighthouse Energy EPC stands as a trusted solar partner for homeowners and commercial clients alike. We don’t just install solar systems — we build long-term relationships powered by trust.
           </p>
           <p className="font-extrabold text-2xl text-blue-900 mt-8">
             Join us in lighting up homes and transforming the way India powers its future.
           </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="font-extrabold text-2xl md:text-3xl text-center text-blue-950 mb-16">Why Choose Lighthouse Energy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "High-quality solar panels & components",
            "Government subsidy & net metering assistance",
            "Fast and professional installation",
            "Transparent pricing – no hidden costs",
            "Dedicated after-sales support",
            "Customized solutions based on your energy needs"
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 flex items-start gap-4 transform transition-transform hover:-translate-y-2">
               <div className="bg-yellow-400 p-3 rounded-full flex-shrink-0 shadow-md">
                 <svg className="w-6 h-6 text-blue-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
               </div>
               <p className="font-bold text-lg text-gray-800 leading-snug">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="bg-blue-950 text-white py-20 rounded-t-3xl shadow-top">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
          
          {/* QR Code Left */}
          <div className="w-full md:w-1/3 flex flex-col items-center text-center order-2 md:order-1">
            <div className="bg-white p-4 rounded-3xl shadow-2xl mb-6 transform transition-transform hover:scale-105">
              <img src="/whatsappqr.png" alt="WhatsApp QR Code" className="w-56 h-56 object-contain rounded-xl" />
            </div>
            <p className="font-semibold text-lg text-yellow-400">Scan for instant WhatsApp chat</p>
          </div>
          
          {/* Details Right */}
          <div className="w-full md:w-2/3 space-y-8 order-1 md:order-2">
            <h2 className="font-extrabold text-2xl mb-6 text-white text-center md:text-left">Support & Contact</h2>
            <p className="text-lg text-blue-100 leading-relaxed text-center md:text-left mb-10">
              We’re always here to help you with consultations, service support, or new installations. Our team will respond quickly to guide you through the best solar solution for your home or business.
            </p>
            <div className="space-y-6 inline-block w-full">
              <a href="mailto:info@lighthouseenergy.in" className="flex items-center gap-6 text-lg hover:text-yellow-400 transition-colors bg-white/5 p-4 rounded-2xl hover:bg-white/10 w-full sm:w-max">
                <div className="bg-blue-600/50 p-3 rounded-full"><MailIcon className="w-6 h-6" /></div>
                <span className="truncate">info@lighthouseenergy.in</span>
              </a>
              <a href="tel:+919243663747" className="flex items-center gap-6 text-lg hover:text-yellow-400 transition-colors bg-white/5 p-4 rounded-2xl hover:bg-white/10 w-full sm:w-max">
                <div className="bg-blue-600/50 p-3 rounded-full"><PhoneIcon className="w-6 h-6" /></div>
                <span className="truncate">+91 9243663747</span>
              </a>
              <a href="https://wa.me/message/G4PLTDKXGMWRA1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 text-lg hover:text-yellow-400 transition-colors bg-white/5 p-4 rounded-2xl hover:bg-white/10 w-full sm:w-max">
                <div className="bg-[#25D366]/20 p-3 rounded-full"><IconBrandWhatsapp className="w-6 h-6 text-[#25D366]" /></div>
                <span className="truncate">Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Aboutus;