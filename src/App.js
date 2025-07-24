import React, { useState } from "react";

const questions = [
  {
    key: "ageGroup",
    question: "Specify your age group",
    options: [
      { label: "Less than 25", value: 5 },
      { label: "25–35 years", value: 10 },
      { label: "36–50 years", value: 15 },
      { label: "51–60 years", value: 10 },
      { label: "60 years & above", value: 5 },
    ],
  },
  {
    key: "dependents",
    question: "How many people are financially dependent on you?",
    options: [
      { label: "0", value: 20 },
      { label: "1", value: 15 },
      { label: "2", value: 10 },
      { label: "3", value: 5 },
      { label: "3 & more", value: 0 },
    ],
  },
  {
    key: "occupation",
    question: "What's your occupation?",
    options: [
      { label: "Salaried", value: 15 },
      { label: "Self Employed", value: 10 },
    ],
  },
  {
    key: "monthlyIncome",
    question: "What's your monthly income range?",
    options: [
      { label: "Less than 50k", value: 5 },
      { label: "50k–1L", value: 10 },
      { label: "1L–3L", value: 15 },
      { label: "3L & above", value: 20 },
    ],
  },
  {
    key: "incomeSecurity",
    question:
      "How secure do you feel are your current & future income sources?",
    options: [
      { label: "Stable", value: 20 },
      { label: "Variable", value: 10 },
    ],
  },
  {
    key: "investmentUnderstanding",
    question: "How well do you think you understand investing?",
    options: [
      { label: "Newbie", value: 5 },
      { label: "Beginner", value: 10 },
      { label: "Proficient", value: 20 },
    ],
  },
  {
    key: "mindset",
    question: "Which of the following best describes your mindset?",
    options: [
      { label: "Comfortable with High Risk & High Return", value: 20 },
      { label: "Comfortable with Low Risk & Fixed Return", value: 10 },
      { label: "Comfortable with Moderate Risk & Moderate Return", value: 15 },
    ],
  },
  {
    key: "financialGoals",
    question: "What are your financial goals?",
    options: [
      { label: "Saving", value: 5 },
      { label: "Retirement Planning", value: 20 },
      { label: "Electronics Purchase", value: 5 },
      { label: "Automobile", value: 10 },
      { label: "House", value: 20 },
      { label: "Child Education", value: 20 },
    ],
  },
];

export default function App() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[step];

  const handleOptionSelect = (option) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.key]: option.value,
    };
    setAnswers(updatedAnswers);

    if (step + 1 < questions.length) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      calculateScore(updatedAnswers);
    }
  };

  const calculateScore = (finalAnswers) => {
    const total = Object.values(finalAnswers).reduce((a, b) => a + b, 0);
    setScore(total);
    setShowScore(true);
  };

  if (showScore) {
    return (
      <div style={styles.centered}>
        <div style={styles.dialog}>
          <h2>Your Financial Preparedness Score</h2>
          <h1 style={{ color: "green" }}>{score} / 100</h1>
          <p>(Higher score = better preparedness)</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.centered}>
      <div style={styles.dialog}>
        <h3>
          Question {step + 1} of {questions.length}
        </h3>
        <p style={styles.questionText}>{currentQuestion.question}</p>

        <div style={styles.optionList}>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              style={{
                ...styles.optionButton,
                backgroundColor:
                  answers[currentQuestion.key] === option.value
                    ? "#4ade80"
                    : "#e5e7eb",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        <progress
          value={step + 1}
          max={questions.length}
          style={styles.progress}
        />
      </div>
    </div>
  );
}

const styles = {
  centered: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    fontFamily: "Arial, sans-serif",
  },
  dialog: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "450px",
    textAlign: "center",
  },
  questionText: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  optionList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },
  optionButton: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "0.2s",
  },
  progress: {
    width: "100%",
    height: "10px",
    marginTop: "20px",
  },
};
