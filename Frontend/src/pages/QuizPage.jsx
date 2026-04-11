import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";

const QuizPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get(`/questions/topic/${topicId}`);
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, [topicId]);

  const handleNext = async () => {
    const updatedAnswers = [
      ...answers,
      {
        questionId: questions[current]._id,
        selectedOption: selected,
      },
    ];
    setAnswers(updatedAnswers);

    setSelected(null);
    setTimeLeft(30);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      try {
        const res = await API.post("/quiz/submit", {
          topicId,
          answers: updatedAnswers,
        });

        navigate(`/score/${topicId}`, {
          state: res.data,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (!started || !questions.length) return;

    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, started, questions.length]);

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 text-white">
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 px-8 py-10 text-center text-slate-400">
          No quiz is available for this topic yet.
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10">
        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
          <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),rgba(15,23,42,0.92))] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
              Topic Practice
            </p>
            <h1 className="mt-4 text-3xl font-semibold md:text-4xl">Ready for the MCQ round?</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              This quiz is designed as post-lecture practice. Use it to check
              how well the lesson actually landed.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <QuizFact title={`${questions.length}`} text="Questions in this set" />
              <QuizFact title="30s" text="Time per question" />
              <QuizFact title="Timed" text="Focus and answer confidently" />
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-2xl shadow-cyan-950/20 sm:p-8">
            <h2 className="text-2xl font-semibold sm:text-3xl">Start Practice</h2>
            <p className="mt-4 text-slate-400">
              Pick the best answer for each question before the timer runs out.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="mt-8 rounded-full bg-cyan-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Start Quiz
            </button>
          </section>
        </div>
      </div>
    );
  }

  const question = questions[current];
  const timeProgress = (timeLeft / 30) * 100;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                Question {current + 1} of {questions.length}
              </p>
              <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">MCQ Practice</h1>
            </div>
            <div className="rounded-full border border-rose-400/30 bg-rose-500/10 px-5 py-2 text-rose-200">
              {timeLeft}s left
            </div>
          </div>

          <div className="mt-6 h-3 w-full rounded-full bg-slate-800">
            <div
              className="h-3 rounded-full bg-cyan-400 transition-all"
              style={{ width: `${timeProgress}%` }}
            />
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 sm:p-8">
            <h2 className="text-xl leading-8 text-white sm:text-2xl sm:leading-9">{question.question}</h2>

            <div className="mt-8 space-y-4">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selected === i
                      ? "border-cyan-300/50 bg-cyan-400/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-sm text-cyan-200">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                disabled={selected === null}
                onClick={handleNext}
                className="w-full rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {current + 1 === questions.length ? "Finish Quiz" : "Next Question"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizFact = ({ title, text }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
    <div className="text-2xl font-semibold text-white">{title}</div>
    <div className="mt-2 text-sm text-slate-400">{text}</div>
  </div>
);

export default QuizPage;
