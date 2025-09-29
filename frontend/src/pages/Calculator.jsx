import React, { useState } from "react";

export default function Calculator() {
  const [formData, setFormData] = useState({
    state: "",
    monthlyBill: "",
    rooftopArea: "",
    mobileNumber: "",
    propertyType: "",
    whatsappContact: true,
  });

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
    console.log("Form Data:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="relative flex flex-col w-screen h-screen justify-center items-center bg-[url(/calsolar.jpg)] bg-cover bg-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
      <h1 className="font-black text-white text-3xl mb-12">
        Calculator Your Savings
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex-col bg-white/10 backdrop-blur-sm text-white shadow-2xl rounded-3xl p-6 py-10"
      >
        <div className="flex p-2 justify-center items-center">
          <select
            name="state"
            className="outline-none p-2"
            value={formData.state}
            onChange={handleInputChange}
            required
          >
            <option value="">Select State</option>
            {Statewise.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="flex p-2 justify-center items-center">
          <input
            type="number"
            name="monthlyBill"
            placeholder="₹ Average Monthly Bill"
            className="outline-gray-500 rounded-lg p-1 text-center"
            value={formData.monthlyBill}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex p-2 justify-center items-center">
          <input
            type="number"
            name="rooftopArea"
            placeholder="Rooftop Area(approx : in sq.ft.)"
            className="outline-gray-500 rounded-lg p-1 text-center"
            value={formData.rooftopArea}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex p-2 justify-center items-center">
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            className="outline-gray-500 rounded-lg p-1 text-center"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
          />
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
  );
}
