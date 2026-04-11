import { Link, useLocation, useNavigate } from "react-router-dom";

const ScoreCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score = 0,
    totalQuestions = 0,
    percentage = 0,
  } = location.state || {};

  let feedback = "";

  if (percentage >= 80) feedback = "Excellent";
  else if (percentage >= 50) feedback = "Good";
  else feedback = "Needs Improvement";

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-5xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),rgba(15,23,42,0.92))] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Quiz Complete
          </p>
          <h1 className="mt-4 text-3xl font-semibold md:text-4xl">Your practice result is ready.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Use this result as feedback for the lesson you just studied. The
            goal is steady understanding, not just speed.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <ResultStat title="Score" value={`${score}/${totalQuestions}`} />
            <ResultStat title="Percent" value={`${percentage}%`} />
            <ResultStat title="Feedback" value={feedback} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-2xl shadow-cyan-950/20 sm:p-8">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 border-cyan-400/20 bg-cyan-400/10 text-3xl font-semibold text-cyan-300 sm:h-36 sm:w-36 sm:text-4xl">
            {percentage}%
          </div>

          <p className="mt-6 text-lg text-slate-300">{feedback}</p>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Go to My Learning
            </button>

            <Link
              to="/"
              className="block w-full rounded-full border border-white/15 px-6 py-3 text-slate-200 transition hover:border-cyan-300 hover:text-white"
            >
              Explore More Paths
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

const ResultStat = ({ title, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
    <div className="text-sm text-slate-400">{title}</div>
    <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
  </div>
);

export default ScoreCard;
