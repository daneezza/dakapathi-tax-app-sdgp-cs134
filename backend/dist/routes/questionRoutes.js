"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../middlewares/models");
const router = express_1.default.Router();
// Get all questions
router.get('/', (req, res) => {
    res.status(200).json(models_1.questions);
});
// Create a new question
router.post('/', (req, res) => {
    const { title } = req.body;
    const newQuestion = {
        id: (0, models_1.incrementQuestionId)(),
        title,
        likes: 0,
        shares: 0,
        isBookmarked: false,
        answers: []
    };
    models_1.questions.push(newQuestion);
    res.status(201).json(newQuestion);
});
// Add an answer to a question
router.post('/:id/answers', (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const questionIndex = models_1.questions.findIndex(q => q.id === questionId);
    if (questionIndex === -1) {
        return res.status(404).json({ error: 'Question not found' });
    }
    const { content } = req.body;
    const newAnswer = {
        id: (0, models_1.incrementAnswerId)(),
        content,
        questionId,
        likes: 0
    };
    models_1.questions[questionIndex].answers.push(newAnswer);
    res.status(201).json(newAnswer);
});
// Update a question
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const questionIndex = models_1.questions.findIndex(q => q.id === id);
    if (questionIndex === -1) {
        return res.status(404).json({ error: 'Question not found' });
    }
    models_1.questions[questionIndex] = Object.assign(Object.assign({}, models_1.questions[questionIndex]), req.body);
    res.status(200).json(models_1.questions[questionIndex]);
});
exports.default = router;
