import { createServer, IncomingMessage, ServerResponse } from 'http';

interface Answer {
    id: number;
    content: string;
    questionId: number;
    likes: number;
}

interface Question {
    id: number;
    title: string;
    content?: string;
    likes: number;
    shares: number;
    isBookmarked: boolean;
    answers: Answer[];
}

const questions: Question[] = [
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
let nextId = 3;
let nextAnswerId = 1;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
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
        let body = '';
        req.on('data', (chunk) => (body += chunk.toString()));
        req.on('end', () => {
            const { title } = JSON.parse(body);
            const newQuestion = { 
                id: nextId++, 
                title, 
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
    else if (req.method === 'POST' && req.url?.match(/^\/api\/questions\/\d+\/answers$/)) {
        const questionId = parseInt(req.url.split('/')[3], 10);
        const questionIndex = questions.findIndex(q => q.id === questionId);
        
        if (questionIndex === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Question not found' }));
            return;
        }
        
        let body = '';
        req.on('data', (chunk) => (body += chunk.toString()));
        req.on('end', () => {
            const { content } = JSON.parse(body);
            const newAnswer: Answer = {
                id: nextAnswerId++,
                content,
                questionId,
                likes: 0
            };
            
            questions[questionIndex].answers.push(newAnswer);
            res.writeHead(201);
            res.end(JSON.stringify(newAnswer));
        });
    }
    // PUT to update a question (for likes, bookmarks, etc.)
    else if (req.method === 'PUT' && req.url?.match(/^\/api\/questions\/\d+$/)) {
        const id = parseInt(req.url.split('/')[3], 10);
        const questionIndex = questions.findIndex(q => q.id === id);
        
        if (questionIndex === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Question not found' }));
            return;
        }

        let body = '';
        req.on('data', (chunk) => (body += chunk.toString()));
        req.on('end', () => {
            const updates = JSON.parse(body);
            questions[questionIndex] = { ...questions[questionIndex], ...updates };
            res.writeHead(200);
            res.end(JSON.stringify(questions[questionIndex]));
        });
    } 
    // All other routes
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});