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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeminiResponse = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenvConfig_1 = require("../config/dotenvConfig");
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${dotenvConfig_1.API_KEY}`;
const getGeminiResponse = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const response = yield axios_1.default.post(GEMINI_URL, {
            contents: [{ role: "user", parts: [{ text: message }] }],
        });
        return ((_f = (_e = (_d = (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text) ||
            "Sorry, I couldn't generate a response.";
    }
    catch (error) {
        console.error("Error:", ((_g = error.response) === null || _g === void 0 ? void 0 : _g.data) || error.message);
        return "Something went wrong with the chatbot";
    }
});
exports.getGeminiResponse = getGeminiResponse;
