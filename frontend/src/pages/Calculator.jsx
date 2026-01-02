import { IconSolarPanel } from "@tabler/icons-react";
import {
  BadgeIndianRupee,
  Calendar,
  CalendarCheck,
  CalendarRange,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// ✅ FIX: Define API_URL outside the component
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Calculator({ calculationId }) {
  const [formData, setFormData] = useState({
    state: "",
    monthlyBill: "",
    rooftopArea: "",
    mobileNumber: "",
    propertyType: "",
    whatsappContact: true,
  });
  const [error, setError] = useState("");
  const [calculation, setCalculation] = useState(null);
  const [calculationIdState, setCalculationIdState] = useState(
    calculationId || ""
  );

  const resultsRef = useRef(null);

  useEffect(() => {
    if (!calculationIdState) return;

    async function loadCalculation() {
      try {
        const res = await fetch(
          `${API_URL}/api/solar-calculator/calculation/${calculationIdState}`
        );
        const json = await res.json();
        if (json.success) {
          setCalculation(json.data);
          setError("");
        } else {
          setError(json.message || "Calculation not found");
        }
      } catch (err) {
        setError("Network error");
        console.error(err);
      }
    }
    loadCalculation();
  }, [calculationIdState]); // ✅ No dependency warning now because API_URL is external

  useEffect(() => {
    if (calculation && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [calculation]);

  useEffect(() => {
    console.log("Current calculation:", calculation);
  }, [calculation]);

  const Statewise = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" || type === "radio" ? checked : value,
    }));
  };

  const handlePropertyTypeChange = (type) => {
    setFormData((prevState) => ({
      ...prevState,
      propertyType: type,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function submitCalculation() {
      try {
        const res = await fetch(`${API_URL}/api/solar-calculator/calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();

        if (json.success) {
          setCalculation(json.data);
          setCalculationIdState(json.data.calculationId);
          setError("");
        } else {
          setError(json.message || "Calculation failed");
        }
      } catch (err) {
        console.error(err);
        setError("Network error");
      }
    }
    submitCalculation();
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <div className="relative flex flex-col w-screen h-screen justify-center items-center bg-[url(/calsolar.jpg)] bg-cover bg-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
        <h1 className="font-black text-white text-3xl  shadow-2xl mb-8 mt-10">
          Calculator Your Savings
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex-col bg-white/10 backdrop-blur-sm text-white shadow-2xl rounded-3xl p-4 py-4"
        >
          <div className="flex p-1 py-1 justify-start items-center">
            <div>
              <label className="block mb-1">
                State <span className="text-red-400">*</span>
              </label>
              <select
                name="state"
                className="outline-gray-500 border border-gray-100 rounded-lg p-2 bg-black/50 text-white"
                value={formData.state}
                onChange={handleInputChange}
                required
              >
                <option value="">Select State </option>
                {Statewise.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex p-2 justify-start items-center">
            <div>
              <label className="block mb-1">
                Enter Avg Monthly Bill<span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="monthlyBill"
                placeholder="₹ Average Monthly Bill"
                className="outline-gray-500 border border-gray-100 rounded-lg p-1 px-2 text-center bg-transparent"
                value={formData.monthlyBill}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex p-2 justify-start items-center">
            <div>
              <label className="block mb-1">
                Enter Rooftop Area<span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="rooftopArea"
                placeholder="Rooftop Area(approx : in sq.ft.)"
                className="outline-gray-500 border border-gray-100 px-3 rounded-lg p-1 text-center bg-transparent"
                value={formData.rooftopArea}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex p-2 justify-start items-center">
            <div>
              <label className="block mb-1">
                Enter Mobile Number<span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                className="outline-gray-500 border border-gray-100 px-3 rounded-lg p-1 text-center bg-transparent"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-between p-2 mr-2">
            <div className="space-x-1">
              <input
                type="checkbox"
                name="residential"
                checked={formData.propertyType === "residential"}
                onChange={() => handlePropertyTypeChange("residential")}
              />
              <label>Residential</label>
            </div>
            <div className="space-x-1">
              <input
                type="checkbox"
                name="commercial"
                checked={formData.propertyType === "commercial"}
                onChange={() => handlePropertyTypeChange("commercial")}
              />
              <label>Commercial</label>
            </div>
          </div>
          <div className="space-x-1 p-2">
            <input
              type="radio"
              name="whatsappContact"
              checked={formData.whatsappContact}
              onChange={handleInputChange}
            />
            <label>Contact me through WhatsApp</label>
          </div>

          <div className="flex justify-center p-2">
            <button
              type="submit"
              className="p-1 px-12 rounded-full font-semibold bg-black hover:bg-white hover:text-black transition text-white"
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
      {calculation && (
        <div ref={resultsRef} className="flex-col p-4 justify-around">
          <h1 className="text-center mb-4 font-bold text-2xl">
            Calculated Savings
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-200 mr-4 ml-4 p-4 rounded-lg">
            <div className="flex bg-white shadow-2xl items-center p-4 rounded-lg gap-2 ">
              <IconSolarPanel />
              Estimated System Size :{" "}
              {calculation.calculatedSavings?.estimatedSystemSize ?? "N/A"} kW
            </div>
            <div className="flex bg-white shadow-2xl items-center p-4 rounded-lg gap-2 ">
              <BadgeIndianRupee />
              Estimated Cost : ₹{" "}
              {calculation.calculatedSavings?.estimatedCost ?? "N/A"}
            </div>
            <div className="flex bg-white shadow-2xl items-center p-4 rounded-lg gap-2 ">
              <Calendar />
              Monthly Savings : ₹{" "}
              {calculation.calculatedSavings?.monthlySavings ?? "N/A"}
            </div>
            <div className="flex bg-white shadow-2xl items-center p-4 rounded-lg gap-2 ">
              <CalendarCheck />
              Yearly Savings : ₹{" "}
              {calculation.calculatedSavings?.yearlySavings ?? "N/A"}
            </div>
            <div className="flex bg-white shadow-2xl items-center p-4 rounded-lg gap-2 ">
              <CalendarRange />
              Payback Period :{" "}
              {calculation.calculatedSavings?.paybackPeriod ?? "N/A"} Years
            </div>
            <div className="flex bg-white shadow-2xl items-center p-4 rounded-lg gap-2 ">
              <BadgeIndianRupee />
              Subsidy Amount : ₹{" "}
              {calculation.calculatedSavings?.subsidyAmount ?? "N/A"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
