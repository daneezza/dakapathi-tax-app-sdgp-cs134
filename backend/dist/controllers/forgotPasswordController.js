"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = void 0;
const emailService_1 = require("../utils/emailService");
const passwordUtil_1 = require("../utils/passwordUtil");
const authController_1 = require("./authController");
const resetRequests = [];
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const requestPasswordReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = authController_1.users.find(u => u.email === email);
    if (!user)
        return res.status(404).json({ message: 'Email not found' });
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins
    resetRequests.push({ email, otp, expiresAt });
    yield (0, emailService_1.sendOTPEmail)("password-reset", "Your Dakapathi Password-Reset OTP Code", email, otp);
    res.status(200).json({ message: 'Password reset OTP sent to your email' });
});
exports.requestPasswordReset = requestPasswordReset;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, newPassword } = req.body;
    const request = resetRequests.find(r => r.email === email && r.otp === otp);
    if (!request || Date.now() > request.expiresAt) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    const user = authController_1.users.find(u => u.email === email);
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    user.password = yield (0, passwordUtil_1.hashPassword)(newPassword);
    res.status(200).json({ message: 'Password reset successful' });
});
exports.resetPassword = resetPassword;
