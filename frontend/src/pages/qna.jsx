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
  // Getting user email from localStorage using the same pattern as getLocalScores
  const [userEmail, setUserEmail] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return '';
      
      const user = JSON.parse(userData);
      return user.email || '';
    } catch (error) {
      console.error("Error getting user email from localStorage:", error);
      return '';
    }
  });

   // Check for user data changes
   useEffect(() => {
    const checkUserData = () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          if (userEmail !== '') setUserEmail('');
          return;
        }
        
        const user = JSON.parse(userData);
        const storedEmail = user.email || '';
        
        if (storedEmail !== userEmail) {
          setUserEmail(storedEmail);
        }
      } catch (error) {
        console.error("Error checking user data:", error);
      }
    };
    
    // Initial check
    checkUserData();
    
    // Set up a listener for storage events
    window.addEventListener('storage', checkUserData);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', checkUserData);
    };
  }, [userEmail]);

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
    if (!userEmail) {
      setError('Please log in to submit a question');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/questions', {
        text: questionText,
        userEmail: userEmail,
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
    if (!userEmail) {
      setError('Please log in to submit a question');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3000/api/questions/${questionId}/like`, {
        userEmail,
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
    if (!userEmail) {
      setError('Please log in to submit an answer');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/questions/${questionId}/answers`, {
        text: answerText,
        userEmail,
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
    if (!userEmail) {
      setError('Please log in to like answers');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/api/questions/${questionId}/answers/${answerId}/like`,
        { userEmail }
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
            userEmail={userEmail}
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