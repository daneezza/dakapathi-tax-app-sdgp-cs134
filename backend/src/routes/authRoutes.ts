import { Router } from 'express';
import { signup, login, googleSignIn, updateUser, updateUserPassword, deleteUser,checkPasswordStatus } from '../controllers/authController';

const router = Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.post('/google-signin', asyncHandler(googleSignIn));
router.post('/updateUser', updateUser);
router.post('/update-password', updateUserPassword);
router.get('/check-password-status', checkPasswordStatus);


// Add the route for account deletion
router.delete('/delete-account', asyncHandler(deleteUser));

export default router;
