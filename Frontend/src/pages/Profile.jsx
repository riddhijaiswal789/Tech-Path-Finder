import { useEffect, useState, useContext, useMemo } from "react";
import { AuthContext } from "../context/auth-context";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [scores, setScores] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("quizScores")) || {};
    setScores(stored);
  }, []);

  const domains = Object.keys(scores);

  const totalAttempts = domains.length;

  const averageScore = useMemo(() => {
    if (!domains.length) return 0;

    const totalPercent = domains.reduce((acc, domain) => {
      const { score, total } = scores[domain];
      return acc + (score / total) * 100;
    }, 0);

    return Math.round(totalPercent / domains.length);
  }, [scores, domains]);

  const bestDomain = useMemo(() => {
    if (!domains.length) return null;

    return domains.reduce((best, domain) => {
      const percent = (scores[domain].score / scores[domain].total) * 100;
      if (!best || percent > best.percent) {
        return { domain, percent };
      }
      return best;
    }, null);
  }, [scores, domains]);

  const weakestDomain = useMemo(() => {
    if (!domains.length) return null;

    return domains.reduce((worst, domain) => {
      const percent = (scores[domain].score / scores[domain].total) * 100;
      if (!worst || percent < worst.percent) {
        return { domain, percent };
      }
      return worst;
    }, null);
  }, [scores, domains]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 md:px-12 py-10">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold">
          {user?.name || "Student"}'s Profile
        </h1>
        <p className="text-gray-400 mt-2">
          Track your quiz performance & strengths
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <p className="text-gray-400 text-sm">Total Domains Attempted</p>
          <h2 className="text-3xl font-bold mt-2 text-indigo-400">
            {totalAttempts}
          </h2>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <p className="text-gray-400 text-sm">Average Score</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {averageScore}%
          </h2>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <p className="text-gray-400 text-sm">Strongest Domain</p>
          <h2 className="text-xl font-bold mt-2 text-indigo-400">
            {bestDomain ? bestDomain.domain : "N/A"}
          </h2>
        </div>

      </div>

      {/* Detailed Scores */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Domain Performance
        </h2>

        {domains.length === 0 && (
          <p className="text-gray-400">
            No quizzes attempted yet.
          </p>
        )}

        <div className="space-y-6">
          {domains.map((domain, index) => {
            const { score, total, date } = scores[domain];
            const percent = Math.round((score / total) * 100);

            return (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">
                    {domain}
                  </h3>
                  <span className="text-indigo-400 font-semibold">
                    {score} / {total}
                  </span>
                </div>

                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Last Attempt: {new Date(date).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Profile;
