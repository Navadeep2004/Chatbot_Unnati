import React, { useState } from "react";

const questions = [
  { key: "lifeInsurance", question: "Do you have life insurance?", weight: 20 },
  {
    key: "healthInsurance",
    question: "Do you have health insurance?",
    weight: 20,
  },
  {
    key: "monthlyIncome",
    question: "What is your monthly income?",
    weight: 30,
  },
  { key: "investments", question: "Do you have any investments?", weight: 30 },
];

export default function App() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach((q) => {
      const answer = answers[q.key]?.toLowerCase();
      if (q.key === "monthlyIncome") {
        const income = parseInt(answers[q.key], 10);
        if (income > 50000) total += q.weight;
        else if (income > 20000) total += q.weight * 0.5;
      } else {
        if (answer === "yes") total += q.weight;
      }
    });
    setScore(total);
    setShowScore(true);
  };

  if (showScore) {
    return (
      <div style={styles.container}>
        <h2>Your Risk Score</h2>
        <h1 style={{ color: "green" }}>{score} / 100</h1>
        <p>(Higher score = better financial preparedness)</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3>
        Question {step + 1} of {questions.length}
      </h3>
      <progress
        value={step + 1}
        max={questions.length}
        style={{ width: "100%", height: "20px", marginBottom: "20px" }}
      />
      <h2>{questions[step].question}</h2>
      <input
        type="text"
        placeholder="Your answer"
        value={answers[questions[step].key] || ""}
        onChange={(e) =>
          setAnswers({ ...answers, [questions[step].key]: e.target.value })
        }
        style={styles.input}
      />
      <button onClick={handleNext} style={styles.button}>
        {step === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4ade80",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },
};
