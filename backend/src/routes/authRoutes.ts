import { Router } from 'express';
import { signup, login } from '../controllers/authController';
import { googleSignIn } from '../controllers/authController';
import { updateUser } from '../controllers/authController';

const router = Router();


const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.post('/google-signin', asyncHandler(googleSignIn));
router.post('/updateUser', updateUser);


export default router;
