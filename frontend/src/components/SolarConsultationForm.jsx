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
    housingSociety: {
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));
  };

  const handleMonthlyBillSelect = (bill) => {
    handleInputChange("monthlyBill", bill);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData[activeTab]);
    // Handle form submission here
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
          value={formData.housingSociety.fullName}
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
          value={formData.housingSociety.housingSocietyName}
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
            City <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.housingSociety.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 placeholder-white/70 outline-none focus:border-white"
            placeholder="Enter city"
          />
        </div>

        <div>
          <label className="block mb-1">Pin code</label>
          <input
            type="text"
            value={formData.housingSociety.pincode}
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
            value={formData.housingSociety.whatsappNumber}
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
            value={formData.housingSociety.monthlyBill}
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
              className={`border rounded-full px-3 py-1 text-xs transition ${
                formData.housingSociety.designation === option
                  ? "bg-white text-black border-white"
                  : "text-white border-white/40 hover:bg-white hover:text-black"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-1">
          AGM approval status <span className="text-red-400">*</span>
        </label>
        <select
          value={formData.housingSociety.agmApproval}
          onChange={(e) => handleInputChange("agmApproval", e.target.value)}
          className="w-full bg-transparent border border-white/40 rounded-md px-4 py-2 text-white outline-none focus:border-white"
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

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-white text-xl font-semibold mb-2">
          Book a FREE Solar Consultation
        </h2>
        <p className="text-white/70 text-sm">
          And save up to ₹78,000 with subsidy
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center bg-black/50 p-1 rounded-full text-white mb-6">
        <button
          onClick={() => setActiveTab("residential")}
          className={`px-4 py-2 rounded-full transition font-medium text-sm ${
            activeTab === "residential"
              ? "bg-white text-black"
              : "hover:bg-white/10"
          }`}
        >
          Residential
        </button>
        <button
          onClick={() => setActiveTab("housingSociety")}
          className={`px-4 py-2 rounded-full transition font-medium text-sm ${
            activeTab === "housingSociety"
              ? "bg-white text-black"
              : "hover:bg-white/10"
          }`}
        >
          Housing Society
        </button>
        <button
          onClick={() => setActiveTab("commercial")}
          className={`px-4 py-2 rounded-full transition font-medium text-sm ${
            activeTab === "commercial"
              ? "bg-white text-black"
              : "hover:bg-white/10"
          }`}
        >
          Commercial
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-white text-sm overflow-y-auto max-h-96 custom-scrollbar"
      >
        {activeTab === "residential" && renderResidentialForm()}
        {activeTab === "housingSociety" && renderHousingSocietyForm()}
        {activeTab === "commercial" && renderCommercialForm()}

        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            id="terms"
            checked={formData[activeTab].agreeToTerms}
            onChange={(e) =>
              handleInputChange("agreeToTerms", e.target.checked)
            }
            className="mr-2 mt-0.5"
          />
          <label
            htmlFor="terms"
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

        <button
          type="submit"
          className="mt-4 bg-white text-black rounded-full py-3 font-semibold hover:bg-black hover:text-white transition text-base"
        >
          Submit Details
        </button>
      </form>
    </>
  );
};

export default SolarConsultationForm;
