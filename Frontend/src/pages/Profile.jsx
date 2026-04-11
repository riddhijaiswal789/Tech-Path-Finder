import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import API from "../services/api";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/analytics/progress");
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const { totalQuizzes, averageScore, attempts } = analytics;

  let bestDomain = null;
  let weakestDomain = null;

  attempts.forEach((a) => {
    if (!bestDomain || a.percentage > bestDomain.percentage) {
      bestDomain = a;
    }

    if (!weakestDomain || a.percentage < weakestDomain.percentage) {
      weakestDomain = a;
    }
  });

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,145,178,0.22),rgba(15,23,42,0.92))] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Learner Profile
          </p>
          <h1 className="mt-4 text-4xl font-semibold">
            {user?.name || "Student"}&apos;s Progress Story
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            Review your progress, see how your quiz results are trending, and
            spot which topics need another lecture pass.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <StatCard title="Total Quizzes Attempted" value={totalQuizzes} />
          <StatCard
            title="Average Score"
            value={`${Math.round(averageScore)}%`}
          />
          <StatCard
            title="Strongest Topic"
            value={bestDomain?.topic?.name || "N/A"}
          />
        </section>

        {weakestDomain && (
          <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-semibold text-cyan-300">
              Performance Insight
            </h2>

            <p className="mt-4 text-slate-300">
              Your biggest opportunity right now is{" "}
              <span className="font-semibold text-rose-300">
                {weakestDomain.topic?.name}
              </span>
              . Rewatch that lesson and try another quiz after revision.
            </p>
          </section>
        )}

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Quiz Attempts</h2>

          {attempts.length === 0 && (
            <p className="mt-4 text-slate-400">No quizzes attempted yet.</p>
          )}

          <div className="mt-6 space-y-6">
            {attempts.map((a) => (
              <div
                key={a._id}
                className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-6"
              >
                <div className="flex flex-wrap justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold">
                    {a.topic?.name || "Topic"}
                  </h3>

                  <span className="font-semibold text-cyan-300">
                    {a.score} / {a.totalQuestions}
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-cyan-400"
                    style={{ width: `${a.percentage}%` }}
                  />
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  {Math.round(a.percentage)}% on{" "}
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
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

export default Profile;
