import React, { useState } from "react";

const questions = [
  {
    key: "ageGroup",
    question: "You belong to which age group?",
    options: [
      { label: "10–15 years", value: 5 },
      { label: "15–20 years", value: 10 },
      { label: "20–25 years", value: 20 },
    ],
  },
  {
    key: "lifeInsurance",
    question: "Do you have life insurance?",
    options: [
      { label: "Yes", value: 20 },
      { label: "No", value: 0 },
    ],
  },
  {
    key: "monthlyIncome",
    question: "What is your monthly income?",
    options: [
      { label: "Less than ₹20,000", value: 0 },
      { label: "₹20,000 – ₹50,000", value: 15 },
      { label: "Above ₹50,000", value: 30 },
    ],
  },
  {
    key: "investments",
    question: "Do you have any investments?",
    options: [
      { label: "Yes", value: 30 },
      { label: "No", value: 0 },
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
