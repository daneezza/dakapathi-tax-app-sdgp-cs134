"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questions = void 0;
exports.incrementQuestionId = incrementQuestionId;
exports.incrementAnswerId = incrementAnswerId;
// Initial data
exports.questions = [
    {
        id: 1,
        title: 'What is the Tax Ratio of 2024 for income tax?',
        likes: 28,
        shares: 72,
        isBookmarked: false,
        answers: []
    },
    {
        id: 2,
        title: 'What is the Tax Ratio of 2022 for income tax?',
        likes: 28,
        shares: 72,
        isBookmarked: false,
        answers: []
    }
];
// ID counters
let nextId = 3;
let nextAnswerId = 1;
// Helper functions for ID management
function incrementQuestionId() {
    return nextId++;
}
function incrementAnswerId() {
    return nextAnswerId++;
}
