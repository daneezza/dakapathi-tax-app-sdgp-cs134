import { createServer, IncomingMessage, ServerResponse } from 'http';

const questions: { id: number; title: string; content: string }[] = [];
let nextId = 1;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && req.url === '/questions') {
        res.writeHead(200);
        res.end(JSON.stringify(questions));
    } else if (req.method === 'POST' && req.url === '/questions') {
        let body = '';
        req.on('data', (chunk) => (body += chunk.toString()));
        req.on('end', () => {
            const { title, content } = JSON.parse(body);
            const newQuestion = { id: nextId++, title, content };
            questions.push(newQuestion);
            res.writeHead(201);
            res.end(JSON.stringify(newQuestion));
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
