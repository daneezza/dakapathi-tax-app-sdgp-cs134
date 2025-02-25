import { Request, Response } from "express";
import { calculateTax } from "../services/tax.service";
import { TaxCalculationInput } from "../models/tax.model";

export const calculateTaxHandler = (req: Request, res: Response) => {
  try {
    const input: TaxCalculationInput = req.body;
    const result = calculateTax(input);
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Now error.message is safe to access
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred." });
    }
  }
};
