import { Router } from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/forgotPasswordController';

const router = Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  router.post('/request-reset', asyncHandler(requestPasswordReset));
  router.post('/reset-password', asyncHandler(resetPassword));

export default router;
