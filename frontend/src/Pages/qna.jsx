import React, { useState, useEffect } from 'react';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';

const QnA = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setQuestions([]);
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmitQuestion = async (question) => {
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

      const createdQuestion = await response.json();
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

  const handleSubmitAnswer = async (questionId, answerContent) => {
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

      const createdAnswer = await response.json();
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

  const handleLikeQuestion = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, likes: q.likes + 1 } : q))
    );
  };

  const handleLikeAnswer = (questionId, answerId) => {
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

  const handleShareQuestion = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, shares: q.shares + 1 } : q))
    );
  };

  const handleBookmarkQuestion = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, isBookmarked: !q.isBookmarked } : q
      )
    );
  };

  return (
    
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
    
  );
};

export default QnA;