import mongoose from "mongoose";

const solarCalculatorSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    enum: [
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
    ],
  },
  monthlyBill: {
    type: Number,
    required: true,
    min: [100, "Monthly bill must be at least â‚¹100"],
    max: [100000, "Monthly bill cannot exceed â‚¹1,00,000"],
  },
  rooftopArea: {
    type: Number,
    required: true,
    min: [50, "Minimum rooftop area should be 50 sq.ft"],
    max: [10000, "Maximum rooftop area cannot exceed 10,000 sq.ft"],
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"],
  },
  propertyType: {
    type: String,
    required: true,
    enum: ["residential", "commercial"],
  },
  whatsappContact: {
    type: Boolean,
    default: true,
  },
  calculatedSavings: {
    estimatedSystemSize: {
      type: Number,
      min: 0,
    },
    estimatedCost: {
      type: Number,
      min: 0,
    },
    monthlySavings: {
      type: Number,
      min: 0,
    },
    yearlySavings: {
      type: Number,
      min: 0,
    },
    paybackPeriod: {
      type: Number,
      min: 0,
    },
    subsidyAmount: {
      type: Number,
      min: 0,
    },
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better query performance
solarCalculatorSchema.index({ submittedAt: -1 });
solarCalculatorSchema.index({ state: 1 });
solarCalculatorSchema.index({ mobileNumber: 1 });

export default mongoose.model("SolarCalculator", solarCalculatorSchema);
