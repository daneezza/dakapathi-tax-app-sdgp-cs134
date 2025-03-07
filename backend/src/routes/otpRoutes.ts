import { Router } from 'express';
import { sendOTP, verifyOTP } from '../controllers/authController';

const router = Router();

router.post('/send-otp', async (req, res) => await sendOTP(req, res));
router.post('/verify-otp', async (req, res) => await verifyOTP(req, res));

export default router;
