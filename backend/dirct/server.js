"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var quizData_1 = require("../src/quizData"); // Import your quiz data
// Function to handle the GET request for quiz data
var handleGetQuiz = function (res, level) {
    var questionsForLevel = quizData_1.quizData[level]; // Access directly
    if (!questionsForLevel) { // Check if questions were found
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Level not found or no questions for level" }));
        return;
    }
    var formattedQuestions = questionsForLevel.map(function (_a) {
        var id = _a.id, question = _a.question, options = _a.options;
        return ({
            id: id,
            question: question,
            options: options,
        });
    });
    // Add CORS headers (important for cross-origin requests)
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (adjust as needed)
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow specific methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, questions: questionsForLevel }));
};
var handlePostQuizSubmitOne = function (req, res) {
    var body = '';
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        var _a;
        try {
            var userAnswer_1 = JSON.parse(body);
            var question = (_a = quizData_1.quizData[userAnswer_1.level]) === null || _a === void 0 ? void 0 : _a.find(function (q) { return q.id === userAnswer_1.questionId; }); // Use level
            if (!question) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Question not found' }));
                return;
            }
            var isCorrect = question.correctOption.toUpperCase() === userAnswer_1.selectedOption.toUpperCase();
            var result = {
                questionId: userAnswer_1.questionId,
                success: true,
                isCorrect: isCorrect,
                selectedOption: userAnswer_1.selectedOption,
                correctOption: question.correctOption,
                feedback: isCorrect
                    ? 'Correct answer!'
                    : "Incorrect. The correct answer was: ".concat(question.correctOption),
            };
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, result: result }));
        }
        catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Invalid JSON or request format' }));
        }
    });
};
// Create the server and handle requests
var server = http.createServer(function (req, res) {
    var _a;
    var method = req.method, url = req.url;
    // Handle CORS preflight requests
    if (method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.writeHead(204);
        res.end();
        return;
    }
    if (method === "GET" && (url === null || url === void 0 ? void 0 : url.startsWith("/api/quiz/"))) {
        var level = (_a = url === null || url === void 0 ? void 0 : url.split("/").pop()) !== null && _a !== void 0 ? _a : "easy"; // Default to "easy" if no level
        return handleGetQuiz(res, level);
    }
    if (method === "POST" && url === "/api/quiz/submitOne") {
        return handlePostQuizSubmitOne(req, res);
    }
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Route not found" }));
});
// Start the server
var port = 3000;
server.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
