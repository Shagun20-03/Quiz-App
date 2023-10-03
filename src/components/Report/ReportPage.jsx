//ReportPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Report.css'; 
import { useNavigate } from 'react-router-dom';

function ReportPage({ userEmail }) {
  const location = useLocation();
  const userAnswers = location.state.userAnswers || [];
  const questions = location.state.questions || [];
  const navigate = useNavigate();

  if (!questions) {
    return <div>Loading...</div>; // Add loading state or error handling
  }

  // Calculate the score
  let score = 0;

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    if (userAnswer !== '' && userAnswer === question.correct_answer) {
      // Increase the score for correct answers
      score += 1;
    }
  });

  return (
    <div className="report-page">
      <h2>Quiz Report</h2>
      <div className="score-circle">{score}/15</div>
      <table>
        <thead>
          <tr>
            <th className="question-number">Q. No.</th>
            <th>Question</th>
            <th>Your Answer</th>
            <th className="correct-answer-title">Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td className="question-number">{index + 1}</td>
              <td>{question.question}</td>
              <td
                style={{
                  color: userAnswers[index] === question.correct_answer ? 'green' : 'red',
                }}
              >
                {userAnswers[index]}
              </td>
              <td className="correct-answer">{question.correct_answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="try-again-button"
        onClick={() => navigate('/')}
      >
        Try Again
      </button>

    </div>
  );
}

export default ReportPage;
