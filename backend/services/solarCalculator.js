// Solar calculation logic with enhanced state-specific data
export const calculateSolarSavings = (monthlyBill, rooftopArea, state) => {
  // Enhanced state-wise electricity rates and solar potential (in INR per kWh)
  const stateData = {
    "Andhra Pradesh": { rate: 6.5, solarPotential: 5.2 },
    "Arunachal Pradesh": { rate: 4.8, solarPotential: 4.1 },
    Assam: { rate: 6.2, solarPotential: 3.8 },
    Bihar: { rate: 5.5, solarPotential: 4.5 },
    Chhattisgarh: { rate: 5.8, solarPotential: 4.8 },
    Goa: { rate: 4.2, solarPotential: 4.9 },
    Gujarat: { rate: 4.5, solarPotential: 5.8 },
    Haryana: { rate: 6.8, solarPotential: 5.1 },
    "Himachal Pradesh": { rate: 4.1, solarPotential: 4.2 },
    Jharkhand: { rate: 5.9, solarPotential: 4.6 },
    Karnataka: { rate: 5.8, solarPotential: 5.1 },
    Kerala: { rate: 6.1, solarPotential: 4.7 },
    "Madhya Pradesh": { rate: 6.3, solarPotential: 5.2 },
    Maharashtra: { rate: 6.2, solarPotential: 5.0 },
    Manipur: { rate: 5.2, solarPotential: 4.0 },
    Meghalaya: { rate: 4.9, solarPotential: 3.5 },
    Mizoram: { rate: 5.1, solarPotential: 3.8 },
    Nagaland: { rate: 5.3, solarPotential: 3.7 },
    Odisha: { rate: 5.4, solarPotential: 4.8 },
    Punjab: { rate: 5.8, solarPotential: 5.0 },
    Rajasthan: { rate: 5.2, solarPotential: 6.2 },
    Sikkim: { rate: 4.3, solarPotential: 4.1 },
    "Tamil Nadu": { rate: 5.5, solarPotential: 5.3 },
    Telangana: { rate: 6.4, solarPotential: 5.1 },
    Tripura: { rate: 5.7, solarPotential: 3.9 },
    "Uttar Pradesh": { rate: 6.5, solarPotential: 4.9 },
    Uttarakhand: { rate: 5.9, solarPotential: 4.7 },
    "West Bengal": { rate: 6.8, solarPotential: 4.2 },
    Delhi: { rate: 7.1, solarPotential: 4.8 },
    Chandigarh: { rate: 6.9, solarPotential: 4.9 },
    Puducherry: { rate: 6.2, solarPotential: 5.1 },
    default: { rate: 5.5, solarPotential: 4.5 },
  };

  const { rate: electricityRate, solarPotential } =
    stateData[state] || stateData.default;

  // Calculate monthly units consumed
  const monthlyUnits = monthlyBill / electricityRate;

  // Estimate system size based on solar potential of the state
  const dailyUnits = monthlyUnits / 30;
  const estimatedSystemSize =
    Math.round((dailyUnits / solarPotential) * 100) / 100; // kW

  // Check if rooftop area can accommodate the system (100 sq.ft per kW)
  const requiredArea = estimatedSystemSize * 100;
  const maxSystemSize = Math.min(estimatedSystemSize, rooftopArea / 100);

  // Calculate costs (realistic 2025 pricing)
  const costPerKW = 55000; // Average cost per kW in INR (including installation)
  const estimatedCost = Math.round(maxSystemSize * costPerKW);

  // Enhanced subsidy calculation based on current government schemes
  let subsidyAmount = 0;
  if (maxSystemSize <= 3) {
    // 40% subsidy for systems up to 3kW
    subsidyAmount = estimatedCost * 0.4;
  } else if (maxSystemSize <= 10) {
    // 40% for first 3kW, 20% for additional capacity up to 10kW
    subsidyAmount = 3 * costPerKW * 0.4 + (maxSystemSize - 3) * costPerKW * 0.2;
  } else {
    // 40% for first 3kW, 20% for next 7kW, no subsidy beyond 10kW
    subsidyAmount = 3 * costPerKW * 0.4 + 7 * costPerKW * 0.2;
  }
  subsidyAmount = Math.round(subsidyAmount);

  // Calculate monthly and yearly savings
  const systemGenerationPerMonth = maxSystemSize * solarPotential * 30; // kWh
  const unitsOffsetPerMonth = Math.min(systemGenerationPerMonth, monthlyUnits);
  const monthlySavings = Math.round(unitsOffsetPerMonth * electricityRate);
  const yearlySavings = monthlySavings * 12;

  // Payback period calculation (considering maintenance costs)
  const netCost = estimatedCost - subsidyAmount;
  const annualMaintenance = estimatedCost * 0.01; // 1% annual maintenance
  const netAnnualSavings = yearlySavings - annualMaintenance;
  const paybackPeriod =
    netAnnualSavings > 0
      ? Math.round((netCost / netAnnualSavings) * 10) / 10
      : 0;

  return {
    estimatedSystemSize: maxSystemSize,
    estimatedCost,
    monthlySavings,
    yearlySavings,
    paybackPeriod,
    subsidyAmount,
  };
};
