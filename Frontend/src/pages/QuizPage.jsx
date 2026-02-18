import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { quizData } from "../data/quizData";

const QuizPage = () => {
  const { domain } = useParams();
  const navigate = useNavigate();
  const decodedDomain = decodeURIComponent(domain);

  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // Load questions
  useEffect(() => {
    setQuestions(quizData[decodedDomain] || []);
    window.scrollTo(0, 0);
  }, [decodedDomain]);

  // Timer Logic
  useEffect(() => {
    if (!started) return;

    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, started]);

  const handleNext = () => {
    let updatedScore = score;

    if (selected === questions[current]?.answer) {
      updatedScore = score + 1;
      setScore(updatedScore);
    }

    setSelected(null);
    setTimeLeft(30);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      // Save result (future backend ready)
      const prevScores =
        JSON.parse(localStorage.getItem("quizScores")) || {};

      prevScores[decodedDomain] = {
        score: updatedScore,
        total: questions.length,
        date: new Date().toISOString(),
      };

      localStorage.setItem(
        "quizScores",
        JSON.stringify(prevScores)
      );

      // Navigate to ScoreCard page
      navigate(`/score/${encodeURIComponent(decodedDomain)}`, {
        state: {
          score: updatedScore,
          total: questions.length,
        },
      });
    }
  };

  // =========================
  // GET READY SCREEN
  // =========================
  if (!started) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">
          {decodedDomain} Quiz
        </h1>

        <p className="text-gray-400 mb-4">
          {questions.length} Questions • 30 Seconds Each
        </p>

        <p className="text-lg mb-8">
          Ready to challenge yourself?
        </p>

        <button
          onClick={() => setStarted(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold transition"
        >
          Start Quiz 🚀
        </button>
      </div>
    );
  }

  // Safety fallback
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        No Quiz Available
      </div>
    );
  }

  const question = questions[current];
  const timeProgress = (timeLeft / 30) * 100;
  const quizProgress =
    ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 md:px-12 py-10">

      {/* Top Info */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">
          Question {current + 1} / {questions.length}
        </h1>
        <span className="text-red-400 font-bold">
          {timeLeft}s
        </span>
      </div>

      {/* TIME PROGRESS BAR */}
      <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
        <div
          className="bg-red-500 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${timeProgress}%` }}
        />
      </div>

      {/* QUIZ PROGRESS */}
      <div className="w-full bg-gray-800 rounded-full h-2 mb-10">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${quizProgress}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-xl">

        <h2 className="text-xl font-semibold mb-6">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                selected === index
                  ? "bg-indigo-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-8 text-right">
          <button
            disabled={selected === null}
            onClick={handleNext}
            className={`px-6 py-2 rounded-lg transition ${
              selected === null
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {current + 1 === questions.length
              ? "Finish"
              : "Next"}
          </button>
        </div>

      </div>

    </div>
  );
};

export default QuizPage;
