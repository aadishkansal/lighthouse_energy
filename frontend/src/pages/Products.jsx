import Location from "../components/Location";
import { FeaturesSection } from "../components/FeaturesSection";
import { BuildingIcon, FactoryIcon, HouseIcon, ScrollText } from "lucide-react";
import React, { useState } from "react";
import { TimelineOfProcess } from "../components/TimelineOfProcess";

const Products = () => {
  const [activeTab, setActiveTab] = useState("residential");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState({
    residential: false,
    housing: false,
    commercial: false,
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
      agmApproval: "",
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
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Clear errors when switching tabs
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
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
    if (!currentForm.monthlyBill) {
      newErrors.monthlyBill = "Monthly bill information is required";
    }
    if (!currentForm.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to terms and conditions";
    }

    // Tab-specific validations
    if (activeTab === "commercial" && !currentForm.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (activeTab === "housing") {
      if (!currentForm.housingSocietyName.trim()) {
        newErrors.housingSocietyName = "Housing society name is required";
      }
      if (!currentForm.designation) {
        newErrors.designation = "Designation is required";
      }
      if (!currentForm.agmApproval) {
        newErrors.agmApproval = "AGM approval status is required";
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

    console.log("Sending payload:", payload);

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
        console.log("Submission successful:", data);
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
                : {
                    fullName: "",
                    housingSocietyName: "",
                    city: "",
                    pincode: "",
                    whatsappNumber: "",
                    monthlyBill: "",
                    designation: "",
                    agmApproval: "",
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

  const agmApprovalOptions = [
    "We already have AGM approval",
    "We don't have an AGM approval yet",
    "We want help in preparing for our AGM",
  ];


  const renderResidential = () => (
    <section className="space-y-6">
      <div>
        <h1 className="font-extrabold text-2xl text-center">
          Residential Solar Solutions at Lighthouse Energy
        </h1>
      </div>
      <div>
        <p className="font-light text-center">
          Lighthouse Energy offers affordable, high-quality rooftop solar
          systems for homes, helping you reduce electricity bills, gain energy
          independence, and support a greener future with premium panels,
          competitive pricing, and fast installation.
        </p>
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
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                  errors.fullName ? "border-red-400" : "border-white/40"
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
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                  errors.whatsappNumber ? "border-red-400" : "border-white/40"
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
                <label className="block mb-1">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.residential.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                    errors.city ? "border-red-400" : "border-white/40"
                  }`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                )}
              </div>

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
                    className={`border rounded-full px-3 py-1 text-xs transition ${
                      formData.residential.monthlyBill === option
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
                <a href="#" className="underline hover:text-white">
                  terms of service
                </a>{" "}
                &{" "}
                <a href="#" className="underline hover:text-white">
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
        <img src="/resBenlg.svg"></img>
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
      <div>
        <h1 className="font-extrabold text-2xl text-center">
          Commercial Solar Solutions at Lighthouse Energy
        </h1>
      </div>
      <div>
        <p className="font-light text-base text-center">
          At Lighthouse Energy, we provide affordable, high-quality rooftop
          solar systems tailored for businesses, reducing electricity costs,
          enhancing energy independence, and supporting sustainable operations.
          Our competitive pricing, premium panels, exceptional service, and fast
          installations deliver reliable power solutions that drive long-term
          savings and efficiency.
        </p>
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
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                  errors.fullName ? "border-red-400" : "border-white/40"
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
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                  errors.companyName ? "border-red-400" : "border-white/40"
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
                <label className="block mb-1">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.commercial.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                    errors.city ? "border-red-400" : "border-white/40"
                  }`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                )}
              </div>

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
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                    errors.whatsappNumber ? "border-red-400" : "border-white/40"
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
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                    errors.monthlyBill ? "border-red-400" : "border-white/40"
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
                <a href="#" className="underline hover:text-white">
                  terms of service
                </a>{" "}
                &{" "}
                <a href="#" className="underline hover:text-white">
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
        <img src="/comBen.svg"></img>
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
      <div>
        <h1 className="font-extrabold text-2xl text-center">
          Housing Society Solar Solutions at Lighthouse Energy
        </h1>
      </div>

      <div>
        <p className="font-light text-base text-center">
          At Lighthouse Energy, we deliver reliable, high-quality rooftop solar
          systems customized for housing societies, ensuring shared savings,
          energy efficiency, and a sustainable community future
        </p>
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
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                  errors.fullName ? "border-red-400" : "border-white/40"
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
                className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                  errors.housingSocietyName
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
                <label className="block mb-1">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.housing.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                    errors.city ? "border-red-400" : "border-white/40"
                  }`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                )}
              </div>

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
                  className={`w-full bg-transparent border rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white ${
                    errors.whatsappNumber ? "border-red-400" : "border-white/40"
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
                  className={`w-full bg-transparent border rounded-md px-4 py-2 text-white outline-none focus:border-white ${
                    errors.monthlyBill ? "border-red-400" : "border-white/40"
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
                    className={`border rounded-full px-3 py-1 text-xs transition ${
                      formData.housing.designation === option
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

            <div>
              <label className="block mb-1">
                AGM approval status <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.housing.agmApproval}
                onChange={(e) =>
                  handleInputChange("agmApproval", e.target.value)
                }
                className={`w-full bg-transparent border rounded-md px-4 py-2 text-white outline-none focus:border-white ${
                  errors.agmApproval ? "border-red-400" : "border-white/40"
                }`}
              >
                <option value="" className="bg-black">
                  Select Approval Status
                </option>
                {agmApprovalOptions.map((option, i) => (
                  <option key={i} value={option} className="bg-black">
                    {option}
                  </option>
                ))}
              </select>
              {errors.agmApproval && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.agmApproval}
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
                <a href="#" className="underline hover:text-white">
                  terms of service
                </a>{" "}
                &{" "}
                <a href="#" className="underline hover:text-white">
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
          <img src="/houBen.svg"></img>
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

  return (
    <section className="flex flex-col min-h-screen space-y-4 justify-start items-center">
      {/* Heading */}
      <div className="font-black md:text-4xl text-2xl mt-24 z-10">
        <h1>Our Offerings</h1>
      </div>

      {/* Tabs */}
      <div className="bg-yellow-400/70  p-2 space-y-3 sm:rounded-4xl rounded-xl flex flex-col sm:flex-row sm:space-y-0 sm:space-x-3 z-10">
        <button
          className={`p-2 px-4 rounded-full flex gap-1 hover:text-white hover:bg-blue-900 ${
            activeTab === "residential"
              ? "bg-blue-900 text-white"
              : "bg-white text-blue-950"
          }`}
          onClick={() => handleTabChange("residential")}
        >
          <HouseIcon />
          Residential
        </button>

        <button
          className={`p-2 px-4 rounded-full flex gap-1 hover:text-white hover:bg-blue-900  ${
            activeTab === "housing"
              ? "bg-blue-900 text-white"
              : "bg-white text-blue-950"
          }`}
          onClick={() => handleTabChange("housing")}
        >
          <BuildingIcon />
          Housing Society
        </button>
        <button
          className={`p-2 px-4 rounded-full flex gap-1 hover:text-white hover:bg-blue-900 ${
            activeTab === "commercial"
              ? "bg-blue-900 text-white"
              : "bg-white text-blue-950"
          }`}
          onClick={() => handleTabChange("commercial")}
        >
          <FactoryIcon />
          Commercial
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 w-full max-w-4xl px-4">
        {activeTab === "residential" && renderResidential()}
        {activeTab === "commercial" && renderCommercial()}
        {activeTab === "housing" && renderHousingSociety()}
      </div>
    </section>
  );
};

export default Products;
