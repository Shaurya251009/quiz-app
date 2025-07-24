import React, { useState, useEffect } from 'react';
import './App.css';

const questionsBank = [
  {
    id: 'q1',
    text: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    correctAnswer: '4',
  },
  {
    id: 'q2',
    text: 'Capital of France?',
    options: ['London', 'Paris', 'Berlin'],
    correctAnswer: 'Paris',
  },
  {
    id: 'q3',
    text: 'React is developed by?',
    options: ['Google', 'Facebook', 'Amazon'],
    correctAnswer: 'Facebook',
  },
  {
    id: 'q4',
    text: 'What color is the sky?',
    options: ['Blue', 'Red', 'Green'],
    correctAnswer: 'Blue',
  },
  {
    id: 'q5',
    text: 'What is the boiling point of water?',
    options: ['100°C', '90°C', '80°C'],
    correctAnswer: '100°C',
  },
];

function App() {
  const quizLength = 5;

  const [questions] = useState(questionsBank);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [previousQuestionId, setPreviousQuestionId] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const getRandomQuestion = () => {
    let random;
    do {
      random = questions[Math.floor(Math.random() * questions.length)];
    } while (random.id === previousQuestionId);
    setCurrentQuestion(random);
    setPreviousQuestionId(random.id);
    setSelectedAnswer('');
    setFeedback('');
  };

  const handleSubmit = () => {
    if (!selectedAnswer || feedback) return; // prevent double submit

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      setFeedback('✅ Correct!');
    } else {
      setFeedback(`❌ Incorrect! Answer: ${currentQuestion.correctAnswer}`);
    }

    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);

    // Delay next question or end quiz
    if (nextCount >= quizLength) {
      setTimeout(() => setQuizCompleted(true), 1000); // show result after short delay
    } else {
      setTimeout(() => getRandomQuestion(), 1000);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionCount(0);
    setFeedback('');
    setSelectedAnswer('');
    setQuizCompleted(false);
    getRandomQuestion();
  };

  if (quizCompleted) {
    return (
      <div className="App" style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h2>🏁 Quiz Completed!</h2>
        <p>Your Score: <strong>{score} / {quizLength}</strong></p>
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>🧠 Online Quiz</h2>
      <p>Question {questionCount + 1} of {quizLength}</p>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Q:</strong> {currentQuestion.text}
      </div>

      <div>
        {currentQuestion.options.map((option) => (
          <div key={option} style={{ marginBottom: '0.5rem' }}>
            <label>
              <input
                type="radio"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => setSelectedAnswer(option)}
              />{' '}
              {option}
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
        Submit Answer
      </button>

      {feedback && (
        <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          {feedback}
        </div>
      )}
    </div>
  );
}

export default App;
