import Location from "../components/Location";
import { FeaturesSection } from "../components/FeaturesSection";
import { BuildingIcon, FactoryIcon, HouseIcon, ScrollText, ChevronDown, ChevronUp, LampFloor } from "lucide-react";
import React, { useState } from "react";
import { TimelineOfProcess } from "../components/TimelineOfProcess";


const streetLightFaqs = [
  {
    question: "What is the difference between AIO and Semi-Integrated street lights?",
    answer: "In an All-In-One (AIO) light, the solar panel, battery, LED, and sensor are all built into one compact unit. In a Semi-Integrated light, the solar panel is a separate unit mounted at a different angle from the light, allowing better sunlight harvesting."
  },
  {
    question: "How many hours will the light work after a full charge?",
    answer: "Depending on the wattage and battery capacity, our lights are designed to work for 10 to 12 hours on a full charge with sensor-based dimming. In full-bright mode without dimming, runtime varies."
  },
  {
    question: "Do these lights work during cloudy or rainy seasons?",
    answer: "Yes. LiFePO4 batteries store enough energy during sunny days to power the lights for 2 to 3 consecutive cloudy nights depending on the model. For prolonged overcast weather, Hybrid models are recommended."
  },
  {
    question: "Is a pole included with the product?",
    answer: "AIO models do not include a pole. Semi-Integrated lights are available either without a pole or as a complete set including a 6-metre GI pole with all mounting accessories."
  },
  {
    question: "What is the warranty on these products?",
    answer: "AIO SS Plate models come with a 2-year warranty. AIO Aluminium Extrusion models carry a 3-year warranty. Semi-Integrated models are covered as per the manufacturer's applicable warranty terms."
  },
  {
    question: "Is installation included in the price?",
    answer: "Installation and commissioning is the buyer's scope and is not included. Transportation is charged at actuals or on a to-pay basis. We can recommend experienced installation partners."
  }
];

const FAQAccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left focus:outline-none"
      >
        <h4 className="font-bold text-base md:text-lg text-black">{question}</h4>
        {isOpen ? <ChevronUp className="text-gray-400 w-5 h-5 flex-shrink-0 ml-4" /> : <ChevronDown className="text-gray-400 w-5 h-5 flex-shrink-0 ml-4" />}
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  return (
    <div className="mt-20">
      <h2 className="font-extrabold text-2xl mb-8">Frequently Asked Questions</h2>
      <div className="border-t border-gray-200">
        {streetLightFaqs.map((faq, index) => (
          <FAQAccordionItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const Products = () => {
  const [activeTab, setActiveTab] = useState("residential");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState({
    residential: false,
    housing: false,
    commercial: false,
    streetLights: false,
  });

  const [formData, setFormData] = useState({
    residential: {
      fullName: "",
      whatsappNumber: "",
      city: "",
      pincode: "",
      monthlyBill: "",
      agreeToTerms: false,
    },
    housing: {
      fullName: "",
      housingSocietyName: "",
      city: "",
      pincode: "",
      whatsappNumber: "",
      monthlyBill: "",
      designation: "",
      agreeToTerms: false,
    },
    commercial: {
      fullName: "",
      companyName: "",
      city: "",
      pincode: "",
      whatsappNumber: "",
      monthlyBill: "",
      agreeToTerms: false,
    },
    streetLights: {
      fullName: "",
      organizationName: "",
      city: "",
      pincode: "",
      whatsappNumber: "",
      capacityRequired: "",
      agreeToTerms: false,
    },
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Clear errors when switching tabs
    setErrors({});
  };

  const fetchLocationFromPincode = async (pincode, tab) => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    try {
      const res = await fetch(`${API_URL}/api/consultation/lookup-pincode/${pincode}`);
      const result = await res.json();
      if (result.success && result.data.city) {
        setFormData((prev) => ({
          ...prev,
          [tab]: {
            ...prev[tab],
            city: result.data.city, // Auto-fill
          },
        }));
      }
    } catch (err) {
      console.error("Auto-location failed:", err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    if (field === "pincode" && value.length === 6) {
      fetchLocationFromPincode(value, activeTab);
    }
  };

  const handleMonthlyBillSelect = (bill) => {
    handleInputChange("monthlyBill", bill);
  };

  // Form validation function
  const validateForm = () => {
    const currentForm = formData[activeTab];
    const newErrors = {};

    // Common validations
    if (!currentForm.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!currentForm.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required";
    } else if (!/^[6-9]\d{9}$/.test(currentForm.whatsappNumber)) {
      newErrors.whatsappNumber = "Please enter a valid 10-digit mobile number";
    }
    if (!currentForm.city.trim()) {
      newErrors.city = "City is required";
    }
    if (activeTab !== "streetLights" && !currentForm.monthlyBill) {
      newErrors.monthlyBill = "Monthly bill information is required";
    }
    if (!currentForm.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to terms and conditions";
    }

    // Tab-specific validations
    if (activeTab === "commercial" && !currentForm.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (activeTab === "streetLights" && !currentForm.organizationName.trim()) {
      newErrors.organizationName = "Organization/Project name is required";
    }
    if (activeTab === "streetLights" && !currentForm.capacityRequired) {
      newErrors.capacityRequired = "Capacity required is required";
    }
    if (activeTab === "housing") {
      if (!currentForm.housingSocietyName.trim()) {
        newErrors.housingSocietyName = "Housing society name is required";
      }
      if (!currentForm.designation) {
        newErrors.designation = "Designation is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess({
      residential: false,
      housing: false,
      commercial: false,
    });
    setErrors({});

    const payload = {
      formType: activeTab,
      ...formData[activeTab],
    };


    fetch("http://localhost:3000/api/consultation/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }
        return res.json();
      })
      .then((data) => {
        setSubmitSuccess((prev) => ({
          ...prev,
          [activeTab]: true,
        }));

        // Reset form after successful submission
        setFormData((prev) => ({
          ...prev,
          [activeTab]:
            activeTab === "residential"
              ? {
                fullName: "",
                whatsappNumber: "",
                city: "",
                pincode: "",
                monthlyBill: "",
                agreeToTerms: false,
              }
              : activeTab === "commercial"
                ? {
                  fullName: "",
                  companyName: "",
                  city: "",
                  pincode: "",
                  whatsappNumber: "",
                  monthlyBill: "",
                  agreeToTerms: false,
                }
                : activeTab === "housing"
                  ? {
                    fullName: "",
                    housingSocietyName: "",
                    city: "",
                    pincode: "",
                    whatsappNumber: "",
                    monthlyBill: "",
                    designation: "",
                    agreeToTerms: false,
                  }
                  : { /* Fallback for streetLights */
                    fullName: "",
                    organizationName: "",
                    city: "",
                    pincode: "",
                    whatsappNumber: "",
                    capacityRequired: "",
                    agreeToTerms: false,
                  },
        }));
      })
      .catch((err) => {
        console.error("Submission error:", err);
        setErrors({ submit: "Something went wrong. Please try again." });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const monthlyBillOptions = [
    "Less than ₹1500",
    "₹1500 - ₹2500",
    "₹2500 - ₹4000",
    "₹4000 - ₹8000",
    "More than ₹8000",
  ];

  const designationOptions = [
    "Management committee member",
    "Resident",
    "Builder",
    "Facility Manager",
  ];


  const renderResidential = () => (
    <section className="space-y-6">
      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 max-w-7xl mx-auto px-4 py-12">
        {/* Left Side: Image (appears on top on mobile) */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src="/residential.png"
              alt="Residential Solar Solutions"
              className="w-full h-auto object-cover" loading="lazy" decoding="async"
            />
          </div>
        </div>

        {/* Right Side: Text (appears below image on mobile) */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <div>
            <h1 className="font-extrabold text-xl md:text-3xl">
              Residential Solar Solutions at Lighthouse Energy
            </h1>
          </div>
          <div>
            <p className="font-light text-lg text-gray-600">
              Lighthouse Energy offers affordable, high-quality rooftop solar
              systems for homes, helping you reduce electricity bills, gain
              energy independence, and support a greener future with premium
              panels, competitive pricing, and fast installation.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-16">
        <h1 className="font-extrabold sm:text-4xl text-xl  ">
          Book your <span className="text-blue-900">FREE</span> consultation
          today!
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-4 rounded-xl py-10 px-4 text-white p-6 bg-blue-950 shadow-3xl text-sm max-w-lg h-full "
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.residential.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.fullName ? "border-red-400" : "border-white/40"
                  }`}
                placeholder="Enter your name"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">
                WhatsApp Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.residential.whatsappNumber}
                onChange={(e) =>
                  handleInputChange("whatsappNumber", e.target.value)
                }
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.whatsappNumber ? "border-red-400" : "border-white/40"
                  }`}
                placeholder="Enter WhatsApp number"
              />
              {errors.whatsappNumber && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.whatsappNumber}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Pin code</label>
                <input
                  type="text"
                  value={formData.residential.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
                  placeholder="Enter pincode"
                />
              </div>

              <div>
                <label className="block mb-1">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.residential.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.city ? "border-red-400" : "border-white/40"
                    }`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2">
                What is your average monthly bill?{" "}
                <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {monthlyBillOptions.map((option, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleMonthlyBillSelect(option)}
                    className={`border rounded-full px-3 py-1 text-xs transition ${formData.residential.monthlyBill === option
                      ? "bg-white text-black border-white"
                      : "text-white border-white/40 hover:bg-white hover:text-black"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.monthlyBill && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.monthlyBill}
                </p>
              )}
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms-residential"
                checked={formData[activeTab].agreeToTerms}
                onChange={(e) =>
                  handleInputChange("agreeToTerms", e.target.checked)
                }
                className="mr-2 mt-0.5"
              />
              <label
                htmlFor="terms-residential"
                className="text-xs text-white/70 leading-relaxed"
              >
                I agree to lighthouseenergy's{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  terms of service
                </a>{" "}
                &{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  privacy policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 bg-white text-black rounded-full py-3 px-12 font-semibold hover:bg-black hover:text-white transition text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Details"}
            </button>
          </div>

          {/* Success Message */}
          {submitSuccess[activeTab] && (
            <div className="bg-green-600 text-white p-3 rounded-lg text-center">
              Thank you! We'll contact you soon with your solar quote.
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-600 text-white p-3 rounded-lg text-center">
              {errors.submit}
            </div>
          )}
        </form>
      </div>

      <div className="font-bold text-2xl text-center mb-12 mt-12">
        What are the benefits of Residential Solar Systems?
      </div>

      <div className="flex justify-center items-center">
        <img src="/resBenlg.svg" loading="lazy" decoding="async"></img>
      </div>

      <FeaturesSection />

      <div className="space-y-3">
        <h1 className="font-extrabold text-2xl text-left">
          Types of Solar Systems
        </h1>
        <p>
          We offer flexible solar solutions to fit your specific needs. Explore
          our main types below for residential setups:
        </p>
        <ul className="list-disc ml-6 ">
          <li>
            <a
              href="/typesofconnections"
              className="underline font-bold text-lg hover:text-blue-700  "
            >
              On-Grid Solar Systems
            </a>
            : Connected to the utility grid, these systems allow you to sell
            excess power back and rely on the grid during low production
            periods.
          </li>
          <li>
            <a
              href="/typesofconnections"
              className="underline font-bold text-lg hover:text-blue-700  "
            >
              Off-Grid Solar Systems
            </a>
            : Independent setups with battery storage, ideal for remote areas or
            complete energy self-sufficiency without grid reliance.
          </li>
          <li>
            <a
              href="/typesofconnections"
              className="underline font-bold text-lg hover:text-blue-700  "
            >
              Hybrid Solar Systems
            </a>
            : Combines grid connection and storage for maximum efficiency and
            backup.
          </li>
        </ul>
        <p>
          For detailed information on features, benefits, and suitability, visit
          the linked pages.
        </p>
      </div>

      <Location />
      <div>
        <h1 className="flex gap-2 font-extrabold text-2xl justify-center items-center">
          Our Step-by-Step Process <ScrollText />
        </h1>
        <TimelineOfProcess />
      </div>
    </section>
  );

  const renderCommercial = () => (
    <section className="space-y-6">
      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 max-w-7xl mx-auto px-4 py-12">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src="/commercial.png"
              alt="Commercial Solar Solutions"
              className="w-full h-auto object-cover" loading="lazy" decoding="async"
            />
          </div>
        </div>

        {/* Right Side: Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <div>
            <h1 className="font-extrabold text-xl md:text-3xl">
              Commercial Solar Solutions at Lighthouse Energy
            </h1>
          </div>
          <div>
            <p className="font-light text-sm md:text-base text-gray-600">
              At Lighthouse Energy, we provide affordable, high-quality rooftop
              solar systems tailored for businesses, reducing electricity costs,
              enhancing energy independence, and supporting sustainable
              operations. Our competitive pricing, premium panels, exceptional
              service, and fast installations deliver reliable power solutions
              that drive long-term savings and efficiency.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-16">
        <h1 className="font-extrabold sm:text-4xl text-xl  ">
          Book your <span className="text-blue-900">FREE</span> consultation
          today!
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-4 rounded-xl py-10 px-4 text-white p-6 bg-blue-950 shadow-3xl text-sm max-w-lg h-full  "
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.commercial.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.fullName ? "border-red-400" : "border-white/40"
                  }`}
                placeholder="Enter your name"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">
                Company Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.commercial.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.companyName ? "border-red-400" : "border-white/40"
                  }`}
                placeholder="Enter company name"
              />
              {errors.companyName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Pin code</label>
                <input
                  type="text"
                  value={formData.commercial.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
                  placeholder="Enter pincode"
                />
              </div>

              <div>
                <label className="block mb-1">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.commercial.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.city ? "border-red-400" : "border-white/40"
                    }`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">
                  WhatsApp number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.commercial.whatsappNumber}
                  onChange={(e) =>
                    handleInputChange("whatsappNumber", e.target.value)
                  }
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.whatsappNumber ? "border-red-400" : "border-white/40"
                    }`}
                  placeholder="Enter number"
                />
                {errors.whatsappNumber && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1">
                  Average Monthly Bill <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.commercial.monthlyBill}
                  onChange={(e) =>
                    handleInputChange("monthlyBill", e.target.value)
                  }
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.monthlyBill ? "border-red-400" : "border-white/40"
                    }`}
                  placeholder="Enter amount"
                />
                {errors.monthlyBill && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.monthlyBill}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms-commercial"
                checked={formData[activeTab].agreeToTerms}
                onChange={(e) =>
                  handleInputChange("agreeToTerms", e.target.checked)
                }
                className="mr-2 mt-0.5"
              />
              <label
                htmlFor="terms-commercial"
                className="text-xs text-white/70 leading-relaxed"
              >
                I agree to lighthouseenergy's{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  terms of service
                </a>{" "}
                &{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  privacy policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 bg-white text-black rounded-full py-3 px-12 font-semibold hover:bg-black hover:text-white transition text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Details"}
            </button>
          </div>

          {/* Success Message */}
          {submitSuccess[activeTab] && (
            <div className="bg-green-600 text-white p-3 rounded-lg text-center">
              Thank you! We'll contact you soon with your commercial solar
              quote.
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-600 text-white p-3 rounded-lg text-center">
              {errors.submit}
            </div>
          )}
        </form>
      </div>
      <div className="font-bold text-2xl text-center mb-12 mt-12">
        What are the benefits of Commercial Solar Systems?
      </div>

      <div className="flex justify-center items-center">
        <img src="/comBen.svg" loading="lazy" decoding="async"></img>
      </div>

      <FeaturesSection />

      <div className="space-y-3">
        <h1 className="font-extrabold text-2xl text-left">
          Types of Solar Systems
        </h1>
        <p>
          We offer flexible solar solutions to fit your specific needs. Explore
          our main types below for residential setups:
        </p>
        <ul className="list-disc ml-6 ">
          <li>
            <a
              href="/typesofconnections"
              className="underline font-bold text-lg hover:text-blue-700  "
            >
              On-Grid Solar Systems
            </a>
            : Connected to the utility grid, these systems allow you to sell
            excess power back and rely on the grid during low production
            periods.
          </li>
          <li>
            <a
              href="/typesofconnections"
              className="underline font-bold text-lg hover:text-blue-700  "
            >
              Off-Grid Solar Systems
            </a>
            : Independent setups with battery storage, ideal for remote areas or
            complete energy self-sufficiency without grid reliance.
          </li>
          <li>
            <a
              href="/typesofconnections"
              className="underline font-bold text-lg hover:text-blue-700  "
            >
              Hybrid Solar Systems
            </a>
            : Combines grid connection and storage for maximum efficiency and
            backup.
          </li>
        </ul>
        <p>
          For detailed information on features, benefits, and suitability, visit
          the linked pages.
        </p>
      </div>

      <Location />
      <div>
        <h1 className="flex gap-2 font-extrabold text-2xl justify-center items-center">
          Our Step-by-Step Process <ScrollText />
        </h1>
        <TimelineOfProcess />
      </div>
    </section>
  );

  const renderHousingSociety = () => (
    <section className="space-y-6">
      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 max-w-7xl mx-auto px-4 py-12">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src="/housing.png"
              alt="Housing Society Solar Solutions"
              className="w-full h-auto object-cover" loading="lazy" decoding="async"
            />
          </div>
        </div>

        {/* Right Side: Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <div>
            <h1 className="font-extrabold text-xl md:text-3xl">
              Housing Society Solar Solutions at Lighthouse Energy
            </h1>
          </div>
          <div>
            <p className="font-light text-sm md:text-base text-gray-600">
              At Lighthouse Energy, we deliver reliable, high-quality rooftop
              solar systems customized for housing societies, ensuring shared
              savings, energy efficiency, and a sustainable community future.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-16">
        <h1 className="font-extrabold sm:text-4xl text-xl  ">
          Book your <span className="text-blue-900">FREE</span> consultation
          today!
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-4 rounded-xl py-10 px-4 text-white p-6 bg-blue-950 shadow-3xl text-sm max-w-lg h-full "
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.housing.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.fullName ? "border-red-400" : "border-white/40"
                  }`}
                placeholder="Enter your name"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">
                Name of Housing Society <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.housing.housingSocietyName}
                onChange={(e) =>
                  handleInputChange("housingSocietyName", e.target.value)
                }
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.housingSocietyName
                  ? "border-red-400"
                  : "border-white/40"
                  }`}
                placeholder="Enter housing society name"
              />
              {errors.housingSocietyName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.housingSocietyName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Pin code</label>
                <input
                  type="text"
                  value={formData.housing.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
                  placeholder="Enter pincode"
                />
              </div>

              <div>
                <label className="block mb-1">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.housing.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.city ? "border-red-400" : "border-white/40"
                    }`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">
                  WhatsApp number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.housing.whatsappNumber}
                  onChange={(e) =>
                    handleInputChange("whatsappNumber", e.target.value)
                  }
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.whatsappNumber ? "border-red-400" : "border-white/40"
                    }`}
                  placeholder="Enter number"
                />
                {errors.whatsappNumber && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1">
                  Monthly Electricity Bill{" "}
                  <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.housing.monthlyBill}
                  onChange={(e) =>
                    handleInputChange("monthlyBill", e.target.value)
                  }
                  className={`w-full bg-transparent border rounded-md px-4 py-2 text-white outline-none focus:border-white ${errors.monthlyBill ? "border-red-400" : "border-white/40"
                    }`}
                >
                  <option value="" className="bg-black">
                    Select Bill Range
                  </option>
                  <option value="0-50000" className="bg-black">
                    0 - 50000
                  </option>
                  <option value="50000-200000" className="bg-black">
                    50000 - 200000
                  </option>
                  <option value="200000+" className="bg-black">
                    200000+
                  </option>
                </select>
                {errors.monthlyBill && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.monthlyBill}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2">
                What is your designation in Housing Society?{" "}
                <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {designationOptions.map((option, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleInputChange("designation", option)}
                    className={`border rounded-full px-3 py-1 text-xs transition ${formData.housing.designation === option
                      ? "bg-white text-black border-white"
                      : "text-white border-white/40 hover:bg-white hover:text-black"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.designation && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.designation}
                </p>
              )}
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms-society"
                checked={formData[activeTab].agreeToTerms}
                onChange={(e) =>
                  handleInputChange("agreeToTerms", e.target.checked)
                }
                className="mr-2 mt-0.5"
              />
              <label
                htmlFor="terms-society"
                className="text-xs text-white/70 leading-relaxed"
              >
                I agree to lighthouseenergy's{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  terms of service
                </a>{" "}
                &{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  privacy policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 bg-white text-black rounded-full py-3 px-12 font-semibold hover:bg-black hover:text-white transition text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Details"}
            </button>
          </div>

          {/* Success Message */}
          {submitSuccess[activeTab] && (
            <div className="bg-green-600 text-white p-3 rounded-lg text-center">
              Thank you! We'll contact you soon with your housing society solar
              quote.
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-600 text-white p-3 rounded-lg text-center">
              {errors.submit}
            </div>
          )}
        </form>
      </div>
      <div>
        <div className="font-bold text-2xl text-center mb-12 mt-12">
          What are the benefits of Housing Society Solar Systems?
        </div>

        <div className="flex justify-center items-center">
          <img src="/houBen.svg" loading="lazy" decoding="async"></img>
        </div>
      </div>
      <FeaturesSection />

      <div className="space-y-3">
        <h1 className="font-extrabold text-2xl text-left">
          Types of Solar Systems
        </h1>
        <p>
          We offer flexible solar solutions to fit your specific needs. Explore
          our main types below for residential setups:
        </p>
        <ul className="list-disc ml-6 ">
          <li>
            <a
              href="/typesofconnections"
              className="underline font-bold text-lg hover:text-blue-700  "
            >
              On-Grid Solar Systems
            </a>
            : Connected to the utility grid, these systems allow you to sell
            excess power back and rely on the grid during low production
            periods.
          </li>
          <li>
            <a
              href="/typesofconnections"
              className="underline font-bold text-lg hover:text-blue-700  "
            >
              Off-Grid Solar Systems
            </a>
            : Independent setups with battery storage, ideal for remote areas or
            complete energy self-sufficiency without grid reliance.
          </li>
          <li>
            <a
              href="/typesofconnections"
              className="underline font-bold text-lg hover:text-blue-700  "
            >
              Hybrid Solar Systems
            </a>
            : Combines grid connection and storage for maximum efficiency and
            backup.
          </li>
        </ul>
        <p>
          For detailed information on features, benefits, and suitability, visit
          the linked pages.
        </p>
      </div>

      <Location />

      <div>
        <h1 className="flex gap-2 font-extrabold text-2xl justify-center items-center">
          Our Step-by-Step Process <ScrollText />
        </h1>
        <TimelineOfProcess />
      </div>
    </section>
  );


  const renderStreetLights = () => (
    <section className="space-y-6">
      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 max-w-7xl mx-auto px-4 py-12">
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src="/aluminiumssl.png"
              alt="Solar Street Lights Solutions"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <div>
            <h1 className="font-extrabold text-xl md:text-3xl">
              Solar Street Lights at Lighthouse Energy
            </h1>
          </div>
          <div>
            <p className="font-light text-sm md:text-base text-gray-600">
              Lighthouse Energy offers a complete range of solar street lights for residential colonies, commercial complexes, highways, and public spaces — helping you eliminate electricity costs on outdoor lighting with zero wiring hassle, automatic dusk-to-dawn operation, and durable LiFePO4 battery technology built to last. Whether you're lighting a single lane or an entire township, we have the right solution for every scale and budget.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-16">
        <h1 className="font-extrabold sm:text-4xl text-xl  ">
          Book your <span className="text-blue-900">FREE</span> consultation today!
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl py-10 px-4 text-white p-6 bg-blue-950 shadow-3xl text-sm max-w-lg h-full"
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.streetLights.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.fullName ? "border-red-400" : "border-white/40"
                  }`}
                placeholder="Enter your name"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block mb-1">
                Organization / Project Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.streetLights.organizationName}
                onChange={(e) => handleInputChange("organizationName", e.target.value)}
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.organizationName ? "border-red-400" : "border-white/40"
                  }`}
                placeholder="Enter organization or project name"
              />
              {errors.organizationName && <p className="text-red-400 text-sm mt-1">{errors.organizationName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Pin code</label>
                <input
                  type="text"
                  value={formData.streetLights.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
                  placeholder="Enter pincode"
                />
              </div>

              <div>
                <label className="block mb-1">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.streetLights.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.city ? "border-red-400" : "border-white/40"
                    }`}
                  placeholder="Enter city"
                />
                {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">
                  WhatsApp number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.streetLights.whatsappNumber}
                  onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.whatsappNumber ? "border-red-400" : "border-white/40"
                    }`}
                  placeholder="Enter number"
                />
                {errors.whatsappNumber && <p className="text-red-400 text-sm mt-1">{errors.whatsappNumber}</p>}
              </div>

              <div>
                <label className="block mb-1">
                  Capacity required <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  value={formData.streetLights.capacityRequired}
                  onChange={(e) => handleInputChange("capacityRequired", e.target.value)}
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${errors.capacityRequired ? "border-red-400" : "border-white/40"
                    }`}
                  placeholder="e.g. 50 kW"
                  min="1"
                />
                {errors.capacityRequired && <p className="text-red-400 text-sm mt-1">{errors.capacityRequired}</p>}
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms-streetlights"
                checked={formData[activeTab].agreeToTerms}
                onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                className="mr-2 mt-0.5"
              />
              <label htmlFor="terms-streetlights" className="text-xs text-white/70 leading-relaxed">
                I agree to lighthouseenergy's <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">terms of service</a> & <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">privacy policy</a>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 bg-white text-black rounded-full py-3 px-12 font-semibold hover:bg-black hover:text-white transition text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Details"}
            </button>
          </div>

          {submitSuccess[activeTab] && (
            <div className="bg-green-600 text-white p-3 rounded-lg text-center mt-4">
              Thank you! We'll contact you soon regarding your solar street lights requirement.
            </div>
          )}
          {errors.submit && (
            <div className="bg-red-600 text-white p-3 rounded-lg text-center mt-4">{errors.submit}</div>
          )}
        </form>
      </div>

      <div className="space-y-8 max-w-7xl mx-auto px-4 mt-12 mb-16">
        <div>
          <h2 className="font-extrabold text-2xl mb-6 text-center">Types of Solar Street Lights</h2>
          <p className="mb-8 text-gray-700 text-center">We offer flexible street lighting solutions to fit your project scale and budget. Explore our main types below:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col">
              <img src="/ssplatessl.png" alt="All-In-One Solar Street Light" className="w-full h-48 object-contain mb-4" />
              <h3 className="font-bold text-lg mb-2">All-In-One (AIO)</h3>
              <p className="text-gray-600 flex-grow">A compact, self-contained unit where the solar panel, battery, LED light, and PIR sensor are integrated into a single body. Easy to install on any existing pole. Available in SS Plate and premium Aluminium Extrusion models ranging from 15W to 150W.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col">
              <img src="/semiwithoutpole.png" alt="Semi-Integrated Without Pole" className="w-full h-48 object-contain mb-4" />
              <h3 className="font-bold text-lg mb-2">Semi-Integrated (Without Pole)</h3>
              <p className="text-gray-600 flex-grow">The solar panel is mounted separately from the light fixture for better panel angle adjustment. Comes with the light unit and solar panel only — perfect for buyers who already have poles or prefer to source mounting infrastructure independently. 9W to 60W.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col">
              <img src="/semiwithpole.png" alt="Semi-Integrated With Pole" className="w-full h-48 object-contain mb-4" />
              <h3 className="font-bold text-lg mb-2">Semi-Integrated (With Pole)</h3>
              <p className="text-gray-600 flex-grow">Everything in the semi-integrated range, plus a 6-metre GI 76mm OD pole with all mounting accessories included. A truly plug-and-play solution for new installations where no existing infrastructure is present. 9W to 60W.</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-extrabold text-2xl mb-8">Why Choose Our Solar Street Lights</h2>
          <ul className="space-y-6">
            <li className="flex flex-col md:flex-row gap-2 md:gap-4 border-b border-gray-100 pb-4"><span className="font-bold text-blue-900 md:min-w-[250px]">LiFePO4 Battery Technology:</span> <span className="text-gray-700">Significantly safer, longer-lasting, and more thermally stable than conventional lithium-ion alternatives. Handles deep discharge cycles gracefully.</span></li>
            <li className="flex flex-col md:flex-row gap-2 md:gap-4 border-b border-gray-100 pb-4"><span className="font-bold text-blue-900 md:min-w-[250px]">Smart Sensor Control:</span> <span className="text-gray-700">PIR motion sensor (AIO) or dimming controller (Semi-Integrated). Lights automatically brighten on motion and dim during low-activity hours.</span></li>
            <li className="flex flex-col md:flex-row gap-2 md:gap-4 border-b border-gray-100 pb-4"><span className="font-bold text-blue-900 md:min-w-[250px]">No Wiring, Fast Install:</span> <span className="text-gray-700">Operate completely off-grid. No trenching, cable laying, or monthly bills. Fast, clean, and cost-effective.</span></li>
            <li className="flex flex-col md:flex-row gap-2 md:gap-4 border-b border-gray-100 pb-4"><span className="font-bold text-blue-900 md:min-w-[250px]">Hybrid-Ready Options:</span> <span className="text-gray-700">Can be upgraded to operate on both Solar and 230V AC grid power for extended cloudy periods.</span></li>
            <li className="flex flex-col md:flex-row gap-2 md:gap-4 border-b border-gray-100 pb-4"><span className="font-bold text-blue-900 md:min-w-[250px]">GSM Remote Monitoring:</span> <span className="text-gray-700">For large-scale projects, track light status, battery health, and performance data remotely.</span></li>
            <li className="flex flex-col md:flex-row gap-2 md:gap-4"><span className="font-bold text-blue-900 md:min-w-[250px]">Flexible Pole Compatibility:</span> <span className="text-gray-700">AIO models fit poles from 60mm to 88mm OD pipe, making retrofits easy.</span></li>
          </ul>
        </div>

        <div className="mt-20 overflow-x-auto">
          <h2 className="font-extrabold text-2xl mb-8">Product Comparison at a Glance</h2>
          <table className="w-full text-left border-collapse bg-white shadow-xl rounded-lg overflow-hidden">
            <thead className="bg-blue-950 text-white">
              <tr>
                <th className="p-4 border-b border-blue-900 min-w-[150px]">Feature</th>
                <th className="p-4 border-b border-blue-900 min-w-[150px]">AIO SS Plate</th>
                <th className="p-4 border-b border-blue-900 min-w-[150px]">AIO Aluminium</th>
                <th className="p-4 border-b border-blue-900 min-w-[200px]">Semi-Integrated</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="hover:bg-blue-50 transition-colors"><td className="p-4 border-b font-medium">Wattage Range</td><td className="p-4 border-b">15W – 50W</td><td className="p-4 border-b">15W – 150W</td><td className="p-4 border-b">9W – 60W</td></tr>
              <tr className="hover:bg-blue-50 transition-colors"><td className="p-4 border-b font-medium">Battery</td><td className="p-4 border-b">LiFePO4</td><td className="p-4 border-b">LiFePO4</td><td className="p-4 border-b">LiFePO4</td></tr>
              <tr className="hover:bg-blue-50 transition-colors"><td className="p-4 border-b font-medium">Sensor</td><td className="p-4 border-b">PIR</td><td className="p-4 border-b">PIR</td><td className="p-4 border-b">Dimming Controller</td></tr>
              <tr className="hover:bg-blue-50 transition-colors"><td className="p-4 border-b font-medium">Pole Included</td><td className="p-4 border-b">No</td><td className="p-4 border-b">No</td><td className="p-4 border-b">Optional (Set)</td></tr>
              <tr className="hover:bg-blue-50 transition-colors"><td className="p-4 border-b font-medium">Warranty</td><td className="p-4 border-b">2 Years</td><td className="p-4 border-b">3 Years</td><td className="p-4 border-b">As applicable</td></tr>
              <tr className="hover:bg-blue-50 transition-colors"><td className="p-4 border-b font-medium">Best For</td><td className="p-4 border-b">Budget projects</td><td className="p-4 border-b">Premium & large roads</td><td className="p-4 border-b">Flexible installations</td></tr>
            </tbody>
          </table>
        </div>

        <FAQSection />
      </div>

    </section>
  );

  return (
    <section className="flex flex-col min-h-screen space-y-4 justify-start items-center">
      {/* Heading */}
      <div className="font-black md:text-3xl text-xl mt-24 z-10">
        <h1>Our Offerings</h1>
      </div>

      {/* Tabs */}
      <div className="bg-yellow-400/70  p-2 space-y-3 sm:rounded-4xl rounded-xl flex flex-col sm:flex-row sm:space-y-0 sm:space-x-3 z-10">
        <button
          className={`p-2 px-4 rounded-full flex items-center gap-2 hover:text-white hover:bg-blue-900 ${activeTab === "residential"
            ? "bg-blue-900 text-white"
            : "bg-white text-blue-950"
            }`}
          onClick={() => handleTabChange("residential")}
        >
          <HouseIcon />
          Residential
        </button>

        <button
          className={`p-2 px-4 rounded-full flex items-center gap-2 hover:text-white hover:bg-blue-900  ${activeTab === "housing"
            ? "bg-blue-900 text-white"
            : "bg-white text-blue-950"
            }`}
          onClick={() => handleTabChange("housing")}
        >
          <BuildingIcon />
          Housing Society
        </button>
        <button
          className={`p-2 px-4 rounded-full flex items-center gap-2 hover:text-white hover:bg-blue-900 ${activeTab === "commercial"
            ? "bg-blue-900 text-white"
            : "bg-white text-blue-950"
            }`}
          onClick={() => handleTabChange("commercial")}
        >
          <FactoryIcon />
          Commercial
        </button>

        <button
          className={`p-2 px-4 rounded-full flex items-center gap-2 hover:text-white hover:bg-blue-900 transition-colors ${activeTab === "streetLights"
            ? "bg-blue-900 text-white"
            : "bg-white text-blue-950"
            }`}
          onClick={() => handleTabChange("streetLights")}
        >
          <LampFloor />
          Street Lights
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 w-full max-w-4xl px-4">
        {activeTab === "residential" && renderResidential()}
        {activeTab === "commercial" && renderCommercial()}
        {activeTab === "streetLights" && renderStreetLights()}
        {activeTab === "housing" && renderHousingSociety()}
      </div>

      {/* CTA Section */}
      <div className="flex justify-center w-full mt-12 mb-20 z-10">
        <a
          href="/consultationForm"
          className="relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 transition-transform"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-lg font-bold text-white backdrop-blur-3xl">
            Get a Free Consultation Now
          </span>
        </a>
      </div>

    </section >
  );
};

export default Products;
