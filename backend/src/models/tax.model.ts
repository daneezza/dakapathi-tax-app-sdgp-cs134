export interface TaxCalculationInput {
    taxType: string;
    amount: number;
  }
  
  export interface TaxCalculationResult {
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
    report: string;
  }
  