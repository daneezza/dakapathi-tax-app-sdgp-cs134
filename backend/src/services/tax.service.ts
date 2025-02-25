import { TaxCalculationInput, TaxCalculationResult } from "../models/tax.model";
import taxRates from "../utils/taxRates";

export const calculateTax = (input: TaxCalculationInput): TaxCalculationResult => {
  const { taxType, amount } = input;
  
  if (!taxRates.hasOwnProperty(taxType)) {
    throw new Error("Invalid tax type selected.");
  }

  const taxRate = taxRates[taxType];
  const taxAmount = amount * taxRate;
  const totalAmount = amount + taxAmount;

  const report = `
    Tax Calculation Report
    ----------------------
    Tax Type     : ${taxType}
    Amount       : ${amount.toFixed(2)}
    Tax Rate     : ${(taxRate * 100).toFixed(2)}%
    Tax Amount   : Rs.${taxAmount.toFixed(2)}
    Total Amount : Rs.${totalAmount.toFixed(2)}
  `;

  return { taxRate, taxAmount, totalAmount, report };
};
