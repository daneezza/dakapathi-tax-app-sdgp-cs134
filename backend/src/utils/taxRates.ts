const taxRates: Record<string, number> = {
  "Corporate Tax (Standard)": 0.30,  // General corporate tax rate
  "Corporate Tax (Export Services)": 0.15, // Reduced rate for export services
  "VAT (Standard)": 0.18,  // Value Added Tax rate
  "Vehicle Import Duty": 0.20  // Customs duty for vehicles, with a surcharge
};

export default taxRates;
