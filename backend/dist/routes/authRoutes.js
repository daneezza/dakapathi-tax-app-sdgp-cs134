"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authController_2 = require("../controllers/authController");
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.post('/signup', asyncHandler(authController_1.signup));
router.post('/login', asyncHandler(authController_1.login));
router.post('/google-signin', asyncHandler(authController_2.googleSignIn));
exports.default = router;
