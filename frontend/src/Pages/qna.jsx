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
    // generate or create a user id
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) return savedUserId;
    //random unique user id
    const newUserId = 'user-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', newUserId);
    return newUserId;
  });

  useEffect(() => {
    fetchQuestions();
  }, []);
  //fetch question from API
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
  //handles submitting a new question
  const handleQuestionSubmit = async (questionText) => {
    try {
      const response = await axios.post('http://localhost:3000/api/questions', {
        text: questionText,
        userId: userId,
      });
      //add a new question to the list
      setQuestions([response.data, ...questions]);
    } catch (err) {
      setError('Failed to submit question');
      console.error('Error submitting question:', err);
    }
  };
  //handles liking a question
  const handleQuestionLike = async (questionId) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/questions/${questionId}/like`, {
        userId,
      });
      
      // update the liked question in the state
      setQuestions(
        questions.map((q) => (q._id === questionId ? response.data : q))
      );
    } catch (err) {
      setError('Failed to like question');
      console.error('Error liking question:', err);
    }
  };

  //handle submitting an answer to a question
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
  //handles liking an answer
  const handleAnswerLike = async (questionId, answerId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/questions/${questionId}/answers/${answerId}/like`,
        { userId }
      );
      
      // Update corresponding question with the liked answer
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
        {/* Form to submit a new question */}
        <QuestionForm onSubmit={handleQuestionSubmit} />
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading questions...</div>
        ) : (
          // Render the list of questions
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