import { TaxCalculationInput, TaxCalculationResult } from "../models/tax.model";
import taxRates from "../utils/taxRates"; // Import tax rates


export const calculateTax = (input: TaxCalculationInput): TaxCalculationResult => {
  const { taxType, amount } = input;

  let taxRate: number;
  let taxAmount: number = 0;

  if (taxType === "Income Tax") {
    // Define the income tax brackets
    const brackets = [
      { limit: 100000, rate: 0.06 },  // 6% for Rs. 0 to Rs. 100,000
      { limit: 200000, rate: 0.12 },  // 12% for Rs. 100,001 to Rs. 200,000
      { limit: 500000, rate: 0.18 },  // 18% for Rs. 200,001 to Rs. 500,000
      { limit: 1000000, rate: 0.24 }, // 24% for Rs. 500,001 to Rs. 1,000,000
      { limit: 2000000, rate: 0.30 }, // 30% for Rs. 1,000,001 to Rs. 2,000,000
      { limit: Infinity, rate: 0.36 }, // 36% for Rs. 2,000,001 and above
    ];

    let remainingAmount = amount;
    let previousLimit = 0;

    // Calculate tax for each bracket
    for (const bracket of brackets) {
      if (remainingAmount > bracket.limit) {
        // Tax all income in this bracket
        const taxableAmount = bracket.limit - previousLimit;
        taxAmount += taxableAmount * bracket.rate;
        previousLimit = bracket.limit;
      } else {
        // If the remaining amount is within this bracket, tax it accordingly
        const taxableAmount = remainingAmount - previousLimit;
        taxAmount += taxableAmount * bracket.rate;
        break;
      }
    }

    // The overall effective tax rate
    taxRate = taxAmount / amount;
  } else if (taxRates[taxType]) {
    // If it's a tax type from the predefined rates
    taxRate = taxRates[taxType];
    taxAmount = amount * taxRate;
  } else {
    // Handle unsupported tax types
    throw new Error("This tax type is not supported.");
  }

  // Calculate total amount after tax
  const totalAmount = amount + taxAmount;

  // Generate the report
  const report = `
    Tax Type : ${taxType}
    Amount : Rs.${amount.toFixed(2)}
    Tax Rate : ${(taxRate * 100).toFixed(2)}%
    Tax Amount : Rs.${taxAmount.toFixed(2)}
    Total Amount : Rs.${totalAmount.toFixed(2)}
  `;

  return { taxRate, taxAmount, totalAmount, report };
};
