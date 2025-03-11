"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var questions = [
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
var nextId = 3;
var nextAnswerId = 1;
var server = (0, http_1.createServer)(function (req, res) {
    var _a, _b;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    // GET all questions
    if (req.method === 'GET' && (req.url === '/questions' || req.url === '/api/questions')) {
        res.writeHead(200);
        res.end(JSON.stringify(questions));
    }
    // POST a new question
    else if (req.method === 'POST' && (req.url === '/questions' || req.url === '/api/questions')) {
        var body_1 = '';
        req.on('data', function (chunk) { return (body_1 += chunk.toString()); });
        req.on('end', function () {
            var title = JSON.parse(body_1).title;
            var newQuestion = {
                id: nextId++,
                title: title,
                likes: 0,
                shares: 0,
                isBookmarked: false,
                answers: []
            };
            questions.push(newQuestion);
            res.writeHead(201);
            res.end(JSON.stringify(newQuestion));
        });
    }
    // POST an answer to a question
    else if (req.method === 'POST' && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.match(/^\/api\/questions\/\d+\/answers$/))) {
        var questionId_1 = parseInt(req.url.split('/')[3], 10);
        var questionIndex_1 = questions.findIndex(function (q) { return q.id === questionId_1; });
        if (questionIndex_1 === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Question not found' }));
            return;
        }
        var body_2 = '';
        req.on('data', function (chunk) { return (body_2 += chunk.toString()); });
        req.on('end', function () {
            var content = JSON.parse(body_2).content;
            var newAnswer = {
                id: nextAnswerId++,
                content: content,
                questionId: questionId_1,
                likes: 0
            };
            questions[questionIndex_1].answers.push(newAnswer);
            res.writeHead(201);
            res.end(JSON.stringify(newAnswer));
        });
    }
    // PUT to update a question (for likes, bookmarks, etc.)
    else if (req.method === 'PUT' && ((_b = req.url) === null || _b === void 0 ? void 0 : _b.match(/^\/api\/questions\/\d+$/))) {
        var id_1 = parseInt(req.url.split('/')[3], 10);
        var questionIndex_2 = questions.findIndex(function (q) { return q.id === id_1; });
        if (questionIndex_2 === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Question not found' }));
            return;
        }
        var body_3 = '';
        req.on('data', function (chunk) { return (body_3 += chunk.toString()); });
        req.on('end', function () {
            var updates = JSON.parse(body_3);
            questions[questionIndex_2] = __assign(__assign({}, questions[questionIndex_2]), updates);
            res.writeHead(200);
            res.end(JSON.stringify(questions[questionIndex_2]));
        });
    }
    // All other routes
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});
server.listen(3000, function () {
    console.log('Server running on port 3000');
});
