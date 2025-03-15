import { Router } from "express";
import { calculateTaxHandler } from "../controllers/tax.controller";

const router = Router();
router.post("/calculate", calculateTaxHandler);

export default router;
