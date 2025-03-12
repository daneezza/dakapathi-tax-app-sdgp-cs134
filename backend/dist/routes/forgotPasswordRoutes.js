"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forgotPasswordController_1 = require("../controllers/forgotPasswordController");
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.post('/request-reset', asyncHandler(forgotPasswordController_1.requestPasswordReset));
router.post('/reset-password', asyncHandler(forgotPasswordController_1.resetPassword));
exports.default = router;
