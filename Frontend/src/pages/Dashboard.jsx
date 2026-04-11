import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/auth-context";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [domains, setDomains] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/analytics/progress");
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDomains = async () => {
      try {
        const res = await API.get("/domains");
        setDomains(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRecommendation = async () => {
      try {
        const res = await API.get("/analytics/recommendation");
        setRecommendation(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnalytics();
    fetchDomains();
    fetchRecommendation();
  }, []);

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading your learning space...
      </div>
    );
  }

  const latestAttempt = analytics.attempts[0] || null;
  const nextPath = domains[0] || null;
  const recommendationLink = recommendation?.domain
    ? `/domain/${recommendation.domain._id}`
    : "/";
  const recommendationActionLabel =
    recommendation?.type === "revise"
      ? "Revise This Topic"
      : recommendation?.type === "continue"
        ? "Continue Learning"
        : recommendation?.type === "explore"
          ? "Explore This Path"
          : "Open Learning Paths";

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),rgba(15,23,42,0.92))] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            My Learning
          </p>
          <h1 className="mt-4 text-3xl font-semibold md:text-4xl">
            Welcome back, {user?.name || "Learner"}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            This area now supports the real journey: continue learning paths,
            revisit topics, and keep an eye on quiz performance without making
            analytics the first thing you see.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to={nextPath ? `/domain/${nextPath._id}` : "/"}
              className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {nextPath ? `Continue with ${nextPath.name}` : "Explore Paths"}
            </Link>

            <Link
              to="/profile"
              className="rounded-full border border-white/15 px-6 py-3 text-slate-200 transition hover:border-cyan-300 hover:text-white"
            >
              View Full Progress
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <StatCard title="Quizzes Attempted" value={analytics.totalQuizzes} />
          <StatCard
            title="Average Score"
            value={`${Math.round(analytics.averageScore)}%`}
          />
          <StatCard title="Available Paths" value={domains.length} />
        </section>

        <section className="mt-10 rounded-[2rem] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(15,23,42,0.88))] p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Personalized Recommendation
          </p>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4 sm:gap-6">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold text-white">
                {recommendation?.title || "Finding your best next step..."}
              </h2>
              <p className="mt-3 text-slate-300">
                {recommendation?.message ||
                  "We are analyzing your quiz history and available learning paths."}
              </p>
              {recommendation?.reason && (
                <p className="mt-3 text-sm text-cyan-200">
                  Why this was suggested: {recommendation.reason}
                </p>
              )}
            </div>

            <Link
              to={recommendationLink}
              className="w-full rounded-full bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
            >
              {recommendationActionLabel}
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                  Explore
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Pick your next learning path
                </h2>
              </div>

              <Link to="/" className="text-sm text-cyan-200 hover:text-cyan-100">
                See all paths
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {domains.slice(0, 4).map((domain) => (
                <Link
                  key={domain._id}
                  to={`/domain/${domain._id}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-cyan-300/40 hover:bg-white/[0.04]"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {domain.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {domain.description}
                  </p>
                  <div className="mt-4 text-sm text-cyan-200">
                    Open path
                  </div>
                </Link>
              ))}
            </div>

            {!domains.length && (
              <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-5 text-slate-400">
                No learning paths are available right now.
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                Latest Activity
              </p>
              {latestAttempt ? (
                <>
                  <h2 className="mt-3 text-2xl font-semibold">
                    {latestAttempt.topic?.name || "Recent topic"}
                  </h2>
                  <p className="mt-3 text-slate-300">
                    You scored {latestAttempt.score} out of{" "}
                    {latestAttempt.totalQuestions} on your latest MCQ attempt.
                  </p>
                  <div className="mt-5 h-3 rounded-full bg-slate-800">
                    <div
                      className="h-3 rounded-full bg-cyan-400"
                      style={{ width: `${latestAttempt.percentage}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-slate-400">
                    {Math.round(latestAttempt.percentage)}% on{" "}
                    {new Date(latestAttempt.createdAt).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <p className="mt-3 leading-7 text-slate-400">
                  You have not attempted a quiz yet. Start with a learning path,
                  watch the lecture, and then take the topic quiz.
                </p>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                Suggested Flow
              </p>
              <div className="mt-5 space-y-4">
                <FlowItem text="Open a learning path that matches your goal." />
                <FlowItem text="Watch one topic lecture completely before practicing." />
                <FlowItem text="Take the MCQ quiz and review your score trend over time." />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
    <p className="text-sm text-slate-400">{title}</p>
    <h2 className="mt-3 text-3xl font-semibold text-cyan-300">{value}</h2>
  </div>
);

const FlowItem = ({ text }) => (
  <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4 text-slate-300">
    {text}
  </div>
);

export default Dashboard;
