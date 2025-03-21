// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/qna.css';
import QuestionForm from '../components/qna/QuestionForm';
import QuestionList from '../components/qna/QuestionList';

const QnA = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(() => {
    // Get userId from localStorage or create a new one
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) return savedUserId;
    
    const newUserId = 'user-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', newUserId);
    return newUserId;
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/questions');
      setQuestions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch questions');
      setLoading(false);
      console.error('Error fetching questions:', err);
    }
  };

  const handleQuestionSubmit = async (questionText) => {
    try {
      const response = await axios.post('http://localhost:3000/api/questions', {
        text: questionText,
        userId: userId,
      });
      setQuestions([response.data, ...questions]);
    } catch (err) {
      setError('Failed to submit question');
      console.error('Error submitting question:', err);
    }
  };

  const handleQuestionLike = async (questionId) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/questions/${questionId}/like`, {
        userId,
      });
      
      // Update questions state with the updated question
      setQuestions(
        questions.map((q) => (q._id === questionId ? response.data : q))
      );
    } catch (err) {
      setError('Failed to like question');
      console.error('Error liking question:', err);
    }
  };

  const handleAnswerSubmit = async (questionId, answerText) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/questions/${questionId}/answers`, {
        text: answerText,
        userId,
      });
      
      // Update questions state with the new answer
      setQuestions(
        questions.map((q) => (q._id === questionId ? response.data : q))
      );
    } catch (err) {
      setError('Failed to submit answer');
      console.error('Error submitting answer:', err);
    }
  };

  const handleAnswerLike = async (questionId, answerId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/questions/${questionId}/answers/${answerId}/like`,
        { userId }
      );
      
      // Update questions state with the updated answer
      setQuestions(
        questions.map((q) => (q._id === questionId ? response.data : q))
      );
    } catch (err) {
      setError('Failed to like answer');
      console.error('Error liking answer:', err);
    }
  };

  return (
    <div className="appq">
      
      <div className="appq-main">
        <QuestionForm onSubmit={handleQuestionSubmit} />
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading questions...</div>
        ) : (
          <QuestionList
            questions={questions}
            userId={userId}
            onQuestionLike={handleQuestionLike}
            onAnswerSubmit={handleAnswerSubmit}
            onAnswerLike={handleAnswerLike}
          />
        )}
      </div>
    </div>
  );
}

export default QnA;