const taxRates: Record<string, number> = {
  "Corporate Tax (Standard)": 0.30,  // general corporate tax rate
  "Corporate Tax (Export Services)": 0.15, // reduced rate for export services
  "VAT (Standard)": 0.18,  
  "Vehicle Import Duty": 0.20  // customs duty for vehicles (with a surcharge)
};

export default taxRates;
