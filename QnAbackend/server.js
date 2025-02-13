"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var questions = [];
var nextId = 1;
var server = (0, http_1.createServer)(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'GET' && req.url === '/questions') {
        res.writeHead(200);
        res.end(JSON.stringify(questions));
    }
    else if (req.method === 'POST' && req.url === '/questions') {
        var body_1 = '';
        req.on('data', function (chunk) { return (body_1 += chunk.toString()); });
        req.on('end', function () {
            var _a = JSON.parse(body_1), title = _a.title, content = _a.content;
            var newQuestion = { id: nextId++, title: title, content: content };
            questions.push(newQuestion);
            res.writeHead(201);
            res.end(JSON.stringify(newQuestion));
        });
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});
server.listen(3000, function () {
    console.log('Server running on port 3000');
});
