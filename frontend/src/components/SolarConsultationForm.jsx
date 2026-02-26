import { useState } from "react";

const SolarConsultationForm = () => {
  const [activeTab, setActiveTab] = useState("residential");
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
      monthlyBill: "0-50000",
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
  });

  // --- NEW: FUNCTION TO FETCH CITY FROM PINCODE ---
  const fetchLocationFromPincode = async (pincode) => {
    // 1. Get API URL (defaults to localhost if env not set)
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      // 2. Call the new backend endpoint
      const res = await fetch(
        `${API_URL}/api/consultation/lookup-pincode/${pincode}`
      );
      const result = await res.json();

      // 3. If successful, update the CITY in the active tab
      if (result.success && result.data.city) {
        setFormData((prev) => ({
          ...prev,
          [activeTab]: {
            ...prev[activeTab],
            city: result.data.city, // Auto-fill the city
          },
        }));
      }
    } catch (err) {
      console.error("Auto-location detection failed:", err);
      // We don't alert the user here, we just leave the city field for manual entry
    }
  };

  // --- UPDATED INPUT CHANGE HANDLER ---
  const handleInputChange = (field, value) => {
    // 1. Update the state normally
    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));

    // 2. Check if the field is pincode and has 6 digits to trigger lookup
    if (field === "pincode" && value.length === 6) {
      fetchLocationFromPincode(value);
    }
  };

  const handleMonthlyBillSelect = (bill) => {
    handleInputChange("monthlyBill", bill);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------------------------------------------------------
  // HANDLE SUBMIT
  // ---------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      formType: activeTab,
      ...formData[activeTab],
    };


    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    fetch(`${API_URL}/api/consultation/submit`, {
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
        alert("Consultation booked successfully!");

        // Reset form
        setFormData({
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
            monthlyBill: "0-50000",
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
        });
      })
      .catch((err) => {
        console.error("Submission error:", err);
        alert("Error submitting form. Please try again.");
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

  const renderResidentialForm = () => (
    <>
      <div>
        <label className="block mb-1">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.residential.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block mb-1">
          WhatsApp Number <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.residential.whatsappNumber}
          onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
          className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
          placeholder="Enter WhatsApp number"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">
            Pin code <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            maxLength={6}
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
            className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
            placeholder="Enter city"
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
              className={`border rounded-full px-3 py-1 text-xs transition ${formData.residential.monthlyBill === option
                ? "bg-white text-black border-white"
                : "text-white border-white/40 hover:bg-white hover:text-black"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const renderHousingSocietyForm = () => (
    <>
      <div>
        <label className="block mb-1">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.housing.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
          placeholder="Enter your name"
        />
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
          className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
          placeholder="Enter housing society name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">
            Pin code <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            maxLength={6}
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
            className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
            placeholder="Enter city"
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
            className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
            placeholder="Enter number"
          />
        </div>

        <div>
          <label className="block mb-1">
            Monthly Electricity Bill <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.housing.monthlyBill}
            onChange={(e) => handleInputChange("monthlyBill", e.target.value)}
            className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 text-white outline-none focus:border-white"
          >
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
      </div>
    </>
  );

  const renderCommercialForm = () => (
    <>
      <div>
        <label className="block mb-1">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.commercial.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block mb-1">
          Company Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.commercial.companyName}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
          className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
          placeholder="Enter company name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">
            Pin code <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            maxLength={6}
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
            className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
            placeholder="Enter city"
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
            className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
            placeholder="Enter number"
          />
        </div>

        <div>
          <label className="block mb-1">
            Average Monthly Bill <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.commercial.monthlyBill}
            onChange={(e) => handleInputChange("monthlyBill", e.target.value)}
            className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: white;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #f0f0f0;
          }
        `}
      </style>

      {/* Main Container */}
      <div className="flex flex-col h-full max-h-[85vh] w-full">
        {/* Header */}
        <div className="mb-4 shrink-0">
          <h2 className="text-white text-xl font-semibold mb-2">
            Book a FREE Solar Consultation
          </h2>
          <p className="text-white/70 text-sm">
            And save up to ₹78,000 with subsidy
          </p>
        </div>

        {/* Tabs */}
        <div className="flex w-full justify-start items-center bg-black/40 p-1.5 rounded-full text-white mb-6 overflow-x-auto sm:overflow-visible no-scrollbar gap-2 sm:justify-between sm:gap-0">
          <button
            onClick={() => setActiveTab("residential")}
            className={`flex-1 shrink-0 px-4 py-2 rounded-full transition-all duration-300 font-semibold text-xs sm:text-sm whitespace-nowrap ${activeTab === "residential"
              ? "bg-white text-black shadow-md scale-[1.02]"
              : "hover:bg-white/10 text-white/90"
              }`}
          >
            Residential
          </button>

          <button
            onClick={() => setActiveTab("housing")}
            className={`flex-1 shrink-0 px-4 py-2 rounded-full transition-all duration-300 font-semibold text-xs sm:text-sm whitespace-nowrap ${activeTab === "housing"
              ? "bg-white text-black shadow-md scale-[1.02]"
              : "hover:bg-white/10 text-white/90"
              }`}
          >
            Housing Society
          </button>

          <button
            onClick={() => setActiveTab("commercial")}
            className={`flex-1 shrink-0 px-4 py-2 rounded-full transition-all duration-300 font-semibold text-xs sm:text-sm whitespace-nowrap ${activeTab === "commercial"
              ? "bg-white text-black shadow-md scale-[1.02]"
              : "hover:bg-white/10 text-white/90"
              }`}
          >
            Commercial
          </button>
        </div>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 text-white text-sm overflow-y-auto custom-scrollbar pr-3 pb-16 min-h-0"
        >
          {activeTab === "residential" && renderResidentialForm()}
          {activeTab === "housing" && renderHousingSocietyForm()}
          {activeTab === "commercial" && renderCommercialForm()}

          <div className="flex items-start mt-4 w-full">
            <input
              type="checkbox"
              id="terms"
              checked={formData[activeTab].agreeToTerms}
              onChange={(e) =>
                handleInputChange("agreeToTerms", e.target.checked)
              }
              className="mr-2 mt-1 flex-shrink-0"
            />
            <label
              htmlFor="terms"
              className="text-xs text-white/70 leading-relaxed flex-1 break-words"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-white text-black rounded-full py-3 font-semibold hover:bg-black hover:text-white transition text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Details"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SolarConsultationForm;
