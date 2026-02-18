import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { learningPaths } from "../data/learningPaths";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [progress, setProgress] = useState({});
  const [quizScores, setQuizScores] = useState({});

  useEffect(() => {
    const savedProgress =
      JSON.parse(localStorage.getItem("progress")) || {};
    const savedScores =
      JSON.parse(localStorage.getItem("quizScores")) || {};

    setProgress(savedProgress);
    setQuizScores(savedScores);
  }, []);

  /* ============================= */
  /* ======= ANALYTICS LOGIC ===== */
  /* ============================= */

  const domainsExplored = useMemo(() => {
    return learningPaths.filter((path) =>
      path.topics.some(
        (t) => progress[`${path.domain}-${t.title}`]
      )
    ).length;
  }, [progress]);

  const quizzesAttempted = Object.keys(quizScores).length;

  const averageScore = useMemo(() => {
    if (!quizzesAttempted) return 0;

    const totalPercent = Object.values(quizScores).reduce(
      (acc, val) => acc + (val.score / val.total) * 100,
      0
    );

    return Math.round(totalPercent / quizzesAttempted);
  }, [quizScores, quizzesAttempted]);

  const strongestDomain = useMemo(() => {
    if (!quizzesAttempted) return null;

    return Object.entries(quizScores).reduce((best, [domain, val]) => {
      const percent = (val.score / val.total) * 100;
      if (!best || percent > best.percent) {
        return { domain, percent };
      }
      return best;
    }, null);
  }, [quizScores, quizzesAttempted]);

  const weakestDomain = useMemo(() => {
    if (!quizzesAttempted) return null;

    return Object.entries(quizScores).reduce((worst, [domain, val]) => {
      const percent = (val.score / val.total) * 100;
      if (!worst || percent < worst.percent) {
        return { domain, percent };
      }
      return worst;
    }, null);
  }, [quizScores, quizzesAttempted]);

  /* ============================= */

  const goToProfile = () => navigate("/profile");

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 mt-2">
          Welcome back, {user?.name || "Student"} 👋
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-4 gap-8 mb-14">

        <StatCard
          title="Domains Explored"
          value={domainsExplored}
        />

        <StatCard
          title="Quizzes Attempted"
          value={quizzesAttempted}
        />

        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
        />

        <StatCard
          title="Strongest Domain"
          value={strongestDomain?.domain || "N/A"}
        />

      </div>

      {/* PERFORMANCE INSIGHT */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-12">

        <h2 className="text-xl font-semibold mb-6 text-indigo-400">
          Performance Insights
        </h2>

        {quizzesAttempted === 0 ? (
          <p className="text-gray-400">
            You haven’t attempted any quizzes yet.
          </p>
        ) : (
          <div className="space-y-4 text-gray-300">
            <p>
              🎯 Strongest Domain:{" "}
              <span className="text-green-400 font-semibold">
                {strongestDomain.domain} ({Math.round(strongestDomain.percent)}%)
              </span>
            </p>

            <p>
              📉 Needs Improvement:{" "}
              <span className="text-red-400 font-semibold">
                {weakestDomain.domain} ({Math.round(weakestDomain.percent)}%)
              </span>
            </p>
          </div>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex flex-wrap gap-6">

        <button
          onClick={goToProfile}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl transition"
        >
          View Detailed Profile
        </button>

        <button
          onClick={() => navigate("/domain/" + encodeURIComponent(learningPaths[0].domain))}
          className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl transition"
        >
          Explore Domains
        </button>

      </div>

    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
    <p className="text-gray-400 text-sm">{title}</p>
    <h2 className="text-2xl font-bold mt-2 text-indigo-400">
      {value}
    </h2>
  </div>
);

export default Dashboard;
