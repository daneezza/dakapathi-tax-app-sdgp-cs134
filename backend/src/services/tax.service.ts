import { TaxCalculationInput, TaxCalculationResult } from "../models/tax.model";
import taxRates from "../utils/taxRates"; 


export const calculateTax = (input: TaxCalculationInput): TaxCalculationResult => {
  const { taxType, amount } = input;

  let taxRate: number;
  let taxAmount: number = 0;

  if (taxType === "Income Tax") {
    
    const brackets = [
      { limit: 100000, rate: 0.06 },  // 6% for Rs.0-100,000
      { limit: 200000, rate: 0.12 },  // 12% for Rs.100,001-200,000
      { limit: 500000, rate: 0.18 },  // 18% for Rs.200,001-500,000
      { limit: 1000000, rate: 0.24 }, // 24% for Rs.500,001-1,000,000
      { limit: 2000000, rate: 0.30 }, // 30% for Rs.1,000,001-2,000,000
      { limit: Infinity, rate: 0.36 }, // 36% for Rs.2,000,001-above
    ];

    let remainingAmount = amount;
    let previousLimit = 0;

   
    for (const bracket of brackets) {
      if (remainingAmount > bracket.limit) {
       
        const taxableAmount = bracket.limit - previousLimit;
        taxAmount += taxableAmount * bracket.rate;
        previousLimit = bracket.limit;
      } else {
        // if the remaining amount is within this bracket, tax it accordingly
        const taxableAmount = remainingAmount - previousLimit;
        taxAmount += taxableAmount * bracket.rate;
        break;
      }
    }

    // the overall effective tax rate
    taxRate = taxAmount / amount;
  } else if (taxRates[taxType]) {
    // if it's a tax type from the predefined rates
    taxRate = taxRates[taxType];
    taxAmount = amount * taxRate;
  } else {
    
    throw new Error("This tax type is not supported.");
  }

  // total amount with tax
  const totalAmount = amount + taxAmount;

  // generate the report (this is connected to the final user's tax report)
  const report = `
    Tax Type : ${taxType}
    Amount : Rs.${amount.toFixed(2)}
    Tax Rate : ${(taxRate * 100).toFixed(2)}%
    Tax Amount : Rs.${taxAmount.toFixed(2)}
    Total Amount : Rs.${totalAmount.toFixed(2)}
  `;

  return { taxRate, taxAmount, totalAmount, report };
};
