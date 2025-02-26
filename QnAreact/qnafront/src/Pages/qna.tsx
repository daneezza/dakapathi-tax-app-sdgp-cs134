// qna.tsx
import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import '../App.css';
import Template from '../components/template';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

const QnA: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (error) {
        setQuestions([
          {
            id: 1,
            title: 'What is the Tax Ratio of 2024 for income tax?',
            likes: 28,
            shares: 72,
            isBookmarked: false,
            answers: [],
          },
          {
            id: 2,
            title: 'What is the Tax Ratio of 2022 for income tax?',
            likes: 28,
            shares: 72,
            isBookmarked: false,
            answers: [],
          },
        ]);
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmitQuestion = async (question: { title: string }) => {
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdQuestion: Question = await response.json();
      const newQuestion = {
        ...createdQuestion,
        likes: 0,
        shares: 0,
        isBookmarked: false,
        answers: [],
      };
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } catch (error) {
      console.error("Error submitting question:", error);
      const newQuestion = {
        id: Math.max(0, ...questions.map((q) => q.id)) + 1,
        title: question.title,
        likes: 0,
        shares: 0,
        isBookmarked: false,
        answers: [],
      };
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const handleSubmitAnswer = async (questionId: number, answerContent: string) => {
    try {
      const response = await fetch(`/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: answerContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdAnswer: Answer = await response.json();
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId ? { ...q, answers: [...q.answers, createdAnswer] } : q
        )
      );
    } catch (error) {
      console.error("Error submitting answer:", error);
      const newAnswer = {
        id: Math.floor(Math.random() * 10000),
        content: answerContent,
        questionId: questionId,
        likes: 0,
      };
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q
        )
      );
    }
  };

  const handleLikeQuestion = (questionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, likes: q.likes + 1 } : q))
    );
  };

  const handleLikeAnswer = (questionId: number, answerId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.id === answerId ? { ...a, likes: a.likes + 1 } : a
              ),
            }
          : q
      )
    );
  };

  const handleShareQuestion = (questionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, shares: q.shares + 1 } : q))
    );
  };

  const handleBookmarkQuestion = (questionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, isBookmarked: !q.isBookmarked } : q
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template>
          <div className="content-wrapper">
            <QuestionForm onSubmit={handleSubmitQuestion} />
            <QuestionList
              questions={questions}
              onLike={handleLikeQuestion}
              onLikeAnswer={handleLikeAnswer}
              onShare={handleShareQuestion}
              onBookmark={handleBookmarkQuestion}
              onSubmitAnswer={handleSubmitAnswer}
            />
          </div>
        </Template>} />
      </Routes>
    </Router>
  );
};

export default QnA;