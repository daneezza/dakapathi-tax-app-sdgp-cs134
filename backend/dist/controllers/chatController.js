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
exports.chatController = void 0;
const geminiApi_1 = require("../utils/geminiApi");
const chatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ error: "Message is required" });
    }
    const botReply = yield (0, geminiApi_1.getGeminiResponse)(userMessage);
    res.json({ reply: botReply });
});
exports.chatController = chatController;
