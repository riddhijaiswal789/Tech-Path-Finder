import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import API from "../services/api";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await API.get("/domains");
        setDomains(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDomains();
  }, []);

  return (
    <div className="bg-slate-950 text-white">
      <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_32%)]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Learn with structure, not random tutorials
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Explore a tech path, study the lessons, then prove it with MCQs.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Tech Path Finder helps learners move in the right order: choose a
              domain, watch topic-based video lectures, and test understanding
              with quiz practice after each lesson.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#learning-paths"
                className="rounded-full bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Explore Learning Paths
              </a>

              {user ? (
                <Link
                  to="/dashboard"
                  className="rounded-full border border-white/15 px-7 py-3 text-slate-200 transition hover:border-cyan-300 hover:text-white"
                >
                  View My Learning
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="rounded-full border border-white/15 px-7 py-3 text-slate-200 transition hover:border-cyan-300 hover:text-white"
                >
                  Create Student Account
                </Link>
              )}
            </div>

            <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
              <HeroStat value={domains.length} label="Learning paths ready" />
              <HeroStat value="Video-led" label="Study experience" />
              <HeroStat value="MCQ" label="Practice after learning" />
            </div>
          </div>

          <div className="grid gap-4">
            <JourneyCard
              step="01"
              title="Pick a domain"
              description="Start with a focused path like web development, data, or any domain your admin has prepared."
            />
            <JourneyCard
              step="02"
              title="Learn topic by topic"
              description="Open a path, watch the lesson video for a topic, and move through the material in sequence."
            />
            <JourneyCard
              step="03"
              title="Take MCQ practice"
              description="Complete the quiz after learning so the app measures what you understood, not what you guessed."
            />
          </div>
        </div>
      </section>

      <section id="learning-paths" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                Learning Paths
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Start with a path that matches your goal
              </h2>
            </div>

            <p className="max-w-2xl text-slate-400">
              Every path is meant to lead the learner from exploration to study
              to assessment, instead of dropping them into a dashboard first.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {domains.map((domain, index) => (
              <Link
                key={domain._id}
                to={`/domain/${domain._id}`}
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200">
                    Path {index + 1}
                  </span>
                  <span className="text-slate-500 transition group-hover:text-cyan-200">
                    Open
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {domain.name}
                </h3>

                <p className="mt-4 min-h-24 text-sm leading-7 text-slate-400">
                  {domain.description}
                </p>

                <div className="mt-8 flex items-center gap-3 text-sm text-slate-300">
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    Video lessons
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    Topic quiz
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {domains.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-400">
              No learning paths are available yet. Add domains from the admin
              panel to start building the student experience.
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/70 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <FeatureCard
            title="Explore before committing"
            description="Learners can browse available domains and understand what each path offers before starting."
          />
          <FeatureCard
            title="Learn with lectures"
            description="Each topic is built around a video lesson so content consumption becomes part of the actual workflow."
          />
          <FeatureCard
            title="Practice with intent"
            description="MCQ quizzes appear after the lesson step, which makes assessment feel like reinforcement instead of pressure."
          />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(6,182,212,0.14),rgba(15,23,42,0.88))] p-8 text-center sm:p-10 md:p-14">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">
            Learning Flow
          </p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            Help users learn first, then measure progress.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            This experience now leads users toward the content itself. The
            dashboard still matters, but it supports the learning journey
            instead of replacing it.
          </p>
        </div>
      </section>
    </div>
  );
};

const HeroStat = ({ value, label }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
    <div className="text-2xl font-semibold text-white">{value}</div>
    <div className="mt-2 text-sm text-slate-400">{label}</div>
  </div>
);

const JourneyCard = ({ step, title, description }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
    <div className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200">
      Step {step}
    </div>
    <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
    <p className="mt-3 leading-7 text-slate-400">{description}</p>
  </div>
);

const FeatureCard = ({ title, description }) => (
  <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-8">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="mt-4 leading-7 text-slate-400">{description}</p>
  </div>
);

export default Home;
