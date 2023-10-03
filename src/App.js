//App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EmailSubmission from './components/EmailSubmission/EmailSubmission';
import Quiz from './components/Quiz/Quiz';
import ReportPage from './components/Report/ReportPage';
import axios from 'axios';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          'https://opentdb.com/api.php?amount=15'
        );
        const formattedQuestions = response.data.results.map((question) => ({
          ...question,
          choices: [...question.incorrect_answers, question.correct_answer],
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchQuestions();
  }, []);

  const handleEmailSubmit = (email) => {
    setUserEmail(email);
    setQuizStarted(true);
    
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            quizStarted ? (
              <Quiz
                userEmail={userEmail}
                questions={questions}
                userAnswers={userAnswers}
              />
            ) : (
              <EmailSubmission onEmailSubmit={handleEmailSubmit} />
            )
          }
        />
        <Route
          path="/report"
          element={
            quizStarted ? (
              <ReportPage
                userEmail={userEmail}
                questions={questions}
                userAnswers={userAnswers}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
