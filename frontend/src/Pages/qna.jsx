import { useState, useEffect } from 'react';
import QuestionForm from '../components/qna/QuestionForm';
import QuestionList from '../components/qna/QuestionList';

const QnA = () => {
  const [questions, setQuestions] = useState([]);
  // Mock current user (in a real app this would come from auth context)
  const [currentUser] = useState({ id: 1 });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Check if each question and answer is liked by current user
        const processedData = data.map(question => ({
          ...question,
          userHasLiked: question.likedBy?.includes(currentUser.id) || false,
          answers: question.answers.map(answer => ({
            ...answer,
            userHasLiked: answer.likedBy?.includes(currentUser.id) || false
          }))
        }));
        
        setQuestions(processedData);
      } catch (error) {
        setQuestions([]);
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [currentUser.id]);

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
        userHasLiked: false
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
        userHasLiked: false
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
      const newAnswer = {
        ...createdAnswer,
        userHasLiked: false
      };
      
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q
        )
      );
    } catch (error) {
      console.error("Error submitting answer:", error);
      const newAnswer = {
        id: Math.floor(Math.random() * 10000),
        content: answerContent,
        questionId: questionId,
        likes: 0,
        userHasLiked: false
      };
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q
        )
      );
    }
  };

  const handleLikeQuestion = async (questionId) => {
    try {
      const response = await fetch(`/api/questions/${questionId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser.id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => 
          q.id === questionId 
            ? { ...q, likes: result.likes, userHasLiked: result.userLiked } 
            : q
        )
      );
    } catch (error) {
      console.error("Error liking question:", error);
      
      // Optimistic update in case of API failure
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => {
          if (q.id === questionId) {
            const newUserHasLiked = !q.userHasLiked;
            const newLikes = newUserHasLiked ? q.likes + 1 : q.likes - 1;
            return { 
              ...q, 
              likes: newLikes >= 0 ? newLikes : 0, 
              userHasLiked: newUserHasLiked 
            };
          }
          return q;
        })
      );
    }
  };

  const handleLikeAnswer = async (questionId, answerId) => {
    try {
      const response = await fetch(`/api/questions/${questionId}/answers/${answerId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser.id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId
            ? {
                ...q,
                answers: q.answers.map((a) =>
                  a.id === answerId 
                    ? { ...a, likes: result.likes, userHasLiked: result.userLiked } 
                    : a
                ),
              }
            : q
        )
      );
    } catch (error) {
      console.error("Error liking answer:", error);
      
      // Optimistic update in case of API failure
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => {
          if (q.id === questionId) {
            return {
              ...q,
              answers: q.answers.map((a) => {
                if (a.id === answerId) {
                  const newUserHasLiked = !a.userHasLiked;
                  const newLikes = newUserHasLiked ? a.likes + 1 : a.likes - 1;
                  return { 
                    ...a, 
                    likes: newLikes >= 0 ? newLikes : 0, 
                    userHasLiked: newUserHasLiked 
                  };
                }
                return a;
              }),
            };
          }
          return q;
        })
      );
    }
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
        currentUserId={currentUser.id}
      />
    </div>
  );
};

export default QnA;