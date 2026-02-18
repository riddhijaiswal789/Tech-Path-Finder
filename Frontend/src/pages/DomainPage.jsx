import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { learningPaths } from "../data/learningPaths";

const DomainPage = () => {
  const { domain } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const decodedDomain = decodeURIComponent(domain);

  const [completed, setCompleted] = useState({});
  const [lastScore, setLastScore] = useState(null);

  // Load topic progress
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("progress")) || {};
    setCompleted(saved);
  }, []);

  // Load quiz score
  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("quizScores")) || {};
    if (scores[decodedDomain]) {
      setLastScore(scores[decodedDomain]);
    } else {
      setLastScore(null);
    }
  }, [decodedDomain]);

  // Save last visited domain
  useEffect(() => {
    localStorage.setItem("lastVisitedDomain", decodedDomain);
  }, [decodedDomain]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [decodedDomain]);

  const currentPath = useMemo(() => {
    return learningPaths.find((p) => p.domain === decodedDomain);
  }, [decodedDomain]);

  const progress = useMemo(() => {
    if (!currentPath) return 0;
    const total = currentPath.topics.length;
    const done = currentPath.topics.filter(
      (t) => completed[`${decodedDomain}-${t.title}`]
    ).length;
    return Math.round((done / total) * 100);
  }, [completed, currentPath, decodedDomain]);

  const toggleComplete = (title) => {
    const key = `${decodedDomain}-${title}`;
    const updated = { ...completed, [key]: !completed[key] };
    setCompleted(updated);
    localStorage.setItem("progress", JSON.stringify(updated));
  };

  const goToDomain = (domainName) => {
    navigate(`/domain/${encodeURIComponent(domainName)}`);
  };

  const goToQuiz = () => {
    navigate(`/quiz/${encodeURIComponent(decodedDomain)}`);
  };

  if (!currentPath) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
        Domain not found.
      </div>
    );
  }

  const percentage =
    lastScore && Math.round((lastScore.score / lastScore.total) * 100);

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-64 bg-black border-r border-gray-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-indigo-400">
            Domains
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {learningPaths.map((path, index) => (
            <div
              key={index}
              onClick={() => goToDomain(path.domain)}
              className={`cursor-pointer px-4 py-3 rounded-lg transition ${
                decodedDomain === path.domain
                  ? "bg-indigo-600"
                  : "hover:bg-gray-800"
              }`}
            >
              {path.domain}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-12">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              {decodedDomain}
            </h1>
            <p className="text-gray-400 mt-2">
              Welcome back, {user?.name || "Student"} 👋
            </p>
          </div>

          {/* QUIZ SECTION */}
          <div className="bg-gray-900 border border-indigo-500 rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">

            <div>
              <h2 className="text-xl font-semibold text-indigo-400">
                {decodedDomain} Assessment
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Test your understanding with domain-based MCQs.
              </p>

              {lastScore && (
                <div className="mt-4 text-sm text-gray-300">
                  <p>
                    Last Score:{" "}
                    <span className="text-indigo-400 font-semibold">
                      {lastScore.score} / {lastScore.total}
                    </span>{" "}
                    ({percentage}%)
                  </p>
                  <p className="text-gray-500 text-xs">
                    Attempted on:{" "}
                    {new Date(lastScore.date).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={goToQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold transition"
            >
              {lastScore ? "Retake Quiz" : "Take Quiz"}
            </button>

          </div>

          {/* LEARNING PROGRESS */}
          <div className="mb-10">
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {progress}% Learning Completed
            </p>
          </div>

          {/* TOPICS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
            {currentPath.topics.map((topic, index) => {
              const key = `${decodedDomain}-${topic.title}`;
              const isDone = completed[key];

              return (
                <div
                  key={index}
                  className={`bg-gray-900 border rounded-2xl p-6 transition hover:scale-105 ${
                    isDone
                      ? "border-green-600"
                      : "border-gray-800 hover:border-indigo-500"
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-3">
                    {topic.title}
                  </h3>

                  <div className="flex justify-between items-center mt-6">
                    <a
                      href={topic.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
                    >
                      Watch
                    </a>

                    <button
                      onClick={() => toggleComplete(topic.title)}
                      className={`text-sm px-4 py-2 rounded-lg transition ${
                        isDone
                          ? "bg-green-600"
                          : "bg-gray-800 border border-gray-700"
                      }`}
                    >
                      {isDone ? "Completed" : "Mark"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DomainPage;
