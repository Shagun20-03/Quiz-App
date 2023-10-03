# [Quiz Application](https://memory-nomads-quiz.netlify.app/)
This is a simple quiz application built using React.js utilizing the Context API. The application uses [Open Trivia Database API](https://opentdb.com/api.php?amount=15) for quiz questions. Below is the information about the application.

## Quiz Layout & Flow
- (EmailSubmission Component)\
• The application's start page requires the user to submit their email address to initiate the quiz. \
• After that, the user is presented with 15 questions, and a timer starts counting down from 30 minutes. Once the timer reaches zero, the quiz is automatically submitted. Also, users can submit using the Submit button.

## Navigation
- (Quiz Component) \
• Users can navigate to a specific question within the quiz. \
• An overview panel shows all questions indicating:
  - Questions the user has visited.
  - And questions the user has attempted.

## End of Quiz
- (Report Component) \
• After the quiz or when the timer ends, users will be directed to a report page. \
• This report will display each question with the user's answer and the correct answer side by side in a format that is easy to compare.

## Data Source 
• Fetch the quiz questions from [Open Trivia Database API](https://opentdb.com/api.php?amount=15). \
• From this API the `question` parameter is used to display the question. \
• Choices shown to the user for each question is a concatenated array of `correct_answer` and `incorrect_answers` parameters. \
• Correct answer for every question is provided in the `correct_answer` parameter. 

## Setup/Installation 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run this application locally, follow these steps:

• Clone this repository to your local machine. \
• Navigate to the project directory in your terminal. \
• Run `npm install` to install the project dependencies. \
• Run `npm start` to start the development server. \
• Open your web browser and visit http://localhost:3000 to access the application. 

### Challenges Faced

Building the Report Page and Question Navigation: \
• Throughout the development process, I encountered a few challenges. One of them was to create a report page that could display every question, along with the user's answer, the correct answer, the score, and the Question Navigation feature. This task required careful management of state and routing to ensure that users could easily move between questions without any confusion. I overcame the challenges by inspecting the console and using Google search.

## Preview Video






https://github.com/Shagun20-03/quiz-app/assets/68726665/7519230d-73e9-47d8-b87e-d4a62aac44b6




