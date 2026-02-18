import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { learningPaths } from "../data/learningPaths";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-gray-950 via-indigo-950 to-black text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl">
          Master Your Tech Career With Structured Learning
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl text-lg">
          Roadmaps, quizzes, interview prep, and real-world practice —
          everything a serious student needs in one powerful platform.
        </p>

        <div className="flex gap-6 mt-8 flex-wrap justify-center">
          {!user ? (
            <>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold transition"
              >
                Start Learning
              </Link>

              <Link
                to="/login"
                className="border border-indigo-500 hover:bg-indigo-900 px-8 py-3 rounded-xl transition"
              >
                Login
              </Link>
            </>
          ) : (
            <>
             <Link
  to={`/domain/${encodeURIComponent(learningPaths[0].domain)}`}
  className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold transition"
>
  Start Learning
</Link>


              <Link
                to="/dashboard"
                className="border border-indigo-500 hover:bg-indigo-900 px-8 py-3 rounded-xl transition"
              >
                View Dashboard
              </Link>
            </>
          )}
        </div>
      </section>

      {/* DOMAIN PREVIEW (MAIN ENTRY FOR LOGGED USERS) */}
      {user && (
        <section className="py-20 px-6 bg-gray-950 text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            Explore Learning Domains
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {learningPaths.slice(0, 6).map((path, index) => (
              <Link
                key={index}
                to={`/domain/${encodeURIComponent(path.domain)}`}
                className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-indigo-500 hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold mb-3 text-indigo-400">
                  {path.domain}
                </h3>

                <p className="text-gray-400 text-sm">
                  {path.topics.length} Structured Topics + Domain Quiz
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* TRUST SECTION */}
      <section className="py-16 bg-gray-900 text-center text-white">
        <p className="text-gray-400 mb-6">Trusted by ambitious learners</p>
        <div className="flex justify-center gap-12 text-gray-500 text-lg flex-wrap">
          <span>🚀 10K+ Students</span>
          <span>⭐ 4.9 Rating</span>
          <span>🎯 Placement Focused</span>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-6 bg-black text-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Why Students Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Card
            title="Structured Roadmaps"
            desc="Clear learning paths for DSA, Web Dev, and Data Science with zero confusion."
          />
          <Card
            title="Interview Ready"
            desc="Mock tests, real interview questions, and company-level practice."
          />
          <Card
            title="Progress Tracking"
            desc="Monitor your growth and stay accountable with smart tracking tools."
          />
        </div>
      </section>

      {/* DIFFERENCE SECTION */}
      <section className="py-28 px-6 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-indigo-900/20 blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">
            Feel The Difference
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-900 p-10 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-semibold mb-6 text-red-400">
                😓 The Usual Way
              </h3>

              <ul className="space-y-4 text-gray-400">
                <li>• Random YouTube tutorials</li>
                <li>• No structured roadmap</li>
                <li>• No progress tracking</li>
                <li>• Confusion & inconsistency</li>
                <li>• Burnout before placements</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-10 rounded-2xl border border-indigo-500/40">
              <h3 className="text-2xl font-semibold mb-6 text-indigo-400">
                🚀 Our Platform
              </h3>

              <ul className="space-y-4 text-gray-300">
                <li>• Structured learning paths</li>
                <li>• Smart quizzes & assessments</li>
                <li>• Real interview preparation</li>
                <li>• Clear progress tracking</li>
                <li>• Confidence + consistency</li>
              </ul>
            </div>
          </div>

          {!user && (
            <div className="mt-20 text-center">
              <p className="text-xl text-gray-300 mb-6">
                Stop consuming content. Start building your future.
              </p>

              <Link
                to="/register"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold transition"
              >
                Join The Movement
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const Card = ({ title, desc }) => (
  <div className="bg-white/5 p-8 rounded-2xl hover:scale-105 transition duration-300">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
);

export default Home;
