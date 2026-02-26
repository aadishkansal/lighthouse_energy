// Services module for handling dynamic mathematical projections of Solar arrays

export const calculateSolarSavings = (
  monthlyBill,
  rooftopArea,
  state,
  propertyType,
  averageUnits
) => {
  const bill = parseFloat(monthlyBill) || 0;
  const area = parseFloat(rooftopArea) || 0;
  // If no units are given, assume ₹8 per unit cost loosely
  const units = parseFloat(averageUnits) || bill / 8;

  // 1 kW requires ~100 sqft area and produces 120-150 units per month.
  const kwFromArea = area / 100;
  const kwFromUnits = units / 120; // conservative mapping

  // Base logic expects smaller restriction
  let estimatedSystemSize = Math.min(kwFromArea, kwFromUnits);
  
  // Floor check against unviable deployments
  if (estimatedSystemSize < 1 && bill > 0) {
    estimatedSystemSize = 1;
  }
  
  // Formatting standard 1 decimal place format e.g 3.4 kW
  estimatedSystemSize = Math.round(estimatedSystemSize * 10) / 10;
  
  // Electricity Generation Avg
  const averageGeneration = Math.round(estimatedSystemSize * 135); // Approx mid point 120-150 range

  // Pricing (approx ~ 70000 per kW without subsidy)
  const estimatedCost = Math.round(estimatedSystemSize * 70000);
  
  // PM Surya Ghar Subsidy calculation
  // Up to 2kW = 30000 per kw. Between 2-3 kW = 60000 + 18000 per kw. > 3 = 78000 flat.
  let subsidyAmount = 0;
  if (propertyType === "residential" || propertyType === "housing") {
     if (estimatedSystemSize <= 2) {
        subsidyAmount = Math.round(estimatedSystemSize * 30000);
     } else if (estimatedSystemSize < 3) {
        subsidyAmount = Math.round(60000 + ((estimatedSystemSize - 2) * 18000));
     } else {
        subsidyAmount = 78000;
     }
  }

  // Savings
  const monthlySavings = bill;
  const yearlySavings = bill * 12;

  // Payback
  const netCost = estimatedCost > subsidyAmount ? estimatedCost - subsidyAmount : 0;
  let paybackPeriod = netCost / (yearlySavings || 1);
  paybackPeriod = Math.max(1, Math.round(paybackPeriod * 10) / 10);
  
  return {
    estimatedSystemSize: estimatedSystemSize.toString(),
    averageGeneration: averageGeneration.toString(),
    estimatedCost: estimatedCost.toString(),
    subsidyAmount: subsidyAmount.toString(),
    monthlySavings: Math.round(monthlySavings).toString(),
    yearlySavings: Math.round(yearlySavings).toString(),
    paybackPeriod: paybackPeriod.toString()
  };
};
