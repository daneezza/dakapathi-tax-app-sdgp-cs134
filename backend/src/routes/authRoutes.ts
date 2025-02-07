import { Router } from 'express';
import { signup, login } from '../controllers/authController';

const router = Router();


const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));

export default router;
