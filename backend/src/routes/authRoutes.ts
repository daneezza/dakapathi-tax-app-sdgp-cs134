import { Router } from 'express';
import { signup, login, googleSignIn, updateUser, updateUserPassword, deleteUser,checkPasswordStatus } from '../controllers/authController';
import { updateProfileImage } from '../controllers/authController';
import { getProfileImage } from '../controllers/authController';

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

router.delete('/delete-account', asyncHandler(deleteUser));
router.post('/updateProfileImage', updateProfileImage);
router.get('/getProfileImage', asyncHandler(getProfileImage));

export default router;
