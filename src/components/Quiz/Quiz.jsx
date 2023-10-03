//Quiz.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Timer from '../Timer';
import './Quiz.css';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizEnded, setQuizEnded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(15).fill(''));
  const navigate = useNavigate();
  const [questionTransition, setQuestionTransition] = useState('question-transition');

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchQuestions();
  }, []);

  // Render the loader while loading
  if (loading) {
    return (
      <div className="overlay">
        <div className="loader"></div>
      </div>
    );
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setQuestionTransition('question-hidden'); // Start the fade-out transition
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setQuestionTransition('question-transition'); // Start the fade-in transition
      }, 300); // Wait for the fade-out transition to complete
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setQuestionTransition('question-hidden'); // Start the fade-out transition
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setQuestionTransition('question-transition'); // Start the fade-in transition
      }, 300); // Wait for the fade-out transition to complete
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleUserAnswer = (answer) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedUserAnswers);
  };

  const handleTimerEnd = () => {
    setLoading(true); // Show loader

    // Simulate a delay (e.g., 2 seconds) before navigating to the report page
    setTimeout(() => {
      setLoading(false); // Hide loader
      setQuizEnded(true);
      navigate('/report', { state: { questions, userAnswers } }); // Navigate to the report page
    }, 2000); // Adjust the delay time as needed
  };

  return (
    <div className="quiz-container">
      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="quiz-title">
        <h2>Quiz Questions</h2>
      </div>
      <div className="timer">
        <Timer onTimerEnd={handleTimerEnd} />
      </div>

      <div className={`question-box ${questionTransition}`}>
        {quizEnded ? (
          null
        ) : (
          <div>
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{questions[currentQuestionIndex].question}</p>
            <ul>
              {questions[currentQuestionIndex].choices.map((choice, optionIndex) => (
                <li key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={choice}
                      checked={userAnswers[currentQuestionIndex] === choice}
                      onChange={() => handleUserAnswer(choice)}
                    />
                    {choice}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="navigation-buttons">
        <button
          className='previous-button'
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button onClick={handleTimerEnd}>Submit</button>
        ) : (
          <button
            className='next-button'
            onClick={handleNextQuestion}
            style={{ float: 'right' }}
          >
            Next
          </button>
        )}
      </div>
      <div className="overview-panel">
        <h3>Question Overview</h3>
        <div className="overview-indication">
          <div className="blue-box"></div> <span>Current Question</span>
          <div className="green-box"></div> <span>Attempted Question</span>
        </div>
        <ul className='question-buttons-container'>
          {questions.map((_, index) => (
            <li
              key={index}
              className={
                currentQuestionIndex === index
                  ? 'current-question'
                  : userAnswers[index] !== ''
                    ? 'attempted-question'
                    : ''
              }
              onClick={() => handleQuestionClick(index)}
            >
              <button
                className={`question-button ${currentQuestionIndex === index
                  ? 'current-question-button'
                  : userAnswers[index] !== ''
                    ? 'attempted-question-button'
                    : ''
                  }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Quiz;
