"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const otpRoutes_1 = __importDefault(require("./routes/otpRoutes"));
const forgotPasswordRoutes_1 = __importDefault(require("./routes/forgotPasswordRoutes"));
const cors_1 = __importDefault(require("cors"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
const authController_1 = require("./controllers/authController");
const path_1 = __importDefault(require("path"));
const news_1 = __importDefault(require("./routes/news"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/videos', express_1.default.static(path_1.default.join(__dirname, '../public/videos')));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/otp', otpRoutes_1.default);
app.use('/api/password', forgotPasswordRoutes_1.default);
app.use('/api/questions', questionRoutes_1.default);
app.use('/api/news', news_1.default);
// routers for user guide
app.get('/api/guides', authController_1.getUserGuides);
app.get('/api/guides/:id', authController_1.getUserGuideById);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
