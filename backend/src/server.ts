import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import { quizData } from "./quizData"; // Import your quiz data

// Function to handle the GET request for quiz data
const handleGetQuiz = (res: ServerResponse, level: string) => {
  const questionsForLevel = quizData[level]; // Access directly
  
  if (!questionsForLevel) { // Check if questions were found
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Level not found or no questions for level" }));
    return;
  }

  const formattedQuestions = questionsForLevel.map(({ id, question, options }) => ({
    id,
    question,
    options,
  }));

  // Add CORS headers (important for cross-origin requests)
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (adjust as needed)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow specific methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: true, questions: questionsForLevel }));
};

const handlePostQuizSubmitOne = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const userAnswer = JSON.parse(body);
      const question = quizData[userAnswer.level]?.find((q) => q.id === userAnswer.questionId); // Use level

      if (!question) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Question not found' }));
        return;
      }

      const isCorrect = question.correctOption.toUpperCase() === userAnswer.selectedOption.toUpperCase();

      const result = {
        questionId: userAnswer.questionId,
        success: true,
        isCorrect,
        selectedOption: userAnswer.selectedOption,
        correctOption: question.correctOption,
        feedback: isCorrect
          ? 'Correct answer!'
          : `Incorrect. The correct answer was: ${question.correctOption}`,
      };

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, result }));

    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Invalid JSON or request format' }));
    }
  });
};


// Create the server and handle requests
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  // Handle CORS preflight requests
  if (method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.writeHead(204);
    res.end();
    return;
  }

  if (method === "GET" && url?.startsWith("/api/quiz/")) {
    const level = url?.split("/").pop() ?? "easy"; // Default to "easy" if no level
    return handleGetQuiz(res, level);
  }

  if (method === "POST" && url === "/api/quiz/submitOne") {
    return handlePostQuizSubmitOne(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: false, message: "Route not found" }));
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});