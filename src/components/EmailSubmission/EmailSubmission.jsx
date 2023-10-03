//EmailSubmission.jsx
import React, { useState } from 'react';
import './EmailSubmission.css';

function EmailSubmission({ onEmailSubmit }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State variable for loading
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleStartClick = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true); // Show the loader

    try {
      // Simulate some asynchronous process (e.g., API request)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Once the process is complete, start the quiz
      onEmailSubmit(email);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Hide the loader when the process is complete
    }
  };

  return (
    <div className="email-submission-container center-form">
      <h2>Welcome to Quiz!</h2>
      <p>Are you ready to test your knowledge? <br /><br />
        Enter your email address here and start the quiz</p>
      <form>
        <input
          type="email"
          placeholder="Enter your email"
          className="email-input"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {isLoading ? ( // Conditionally render the loader div
          <div className="loader"></div>
        ) : (
          <button className="start-button" onClick={handleStartClick}>
            Start
          </button>
        )}
      </form>
    </div>
  );
}

export default EmailSubmission;
