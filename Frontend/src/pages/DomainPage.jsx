import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import LecturePlayer from "../components/LecturePlayer";

const DomainPage = () => {
  const { domain } = useParams();
  const navigate = useNavigate();

  const [domainData, setDomainData] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchDomain = async () => {
      try {
        const res = await API.get(`/domains/${domain}`);
        setDomainData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTopics = async () => {
      try {
        const res = await API.get(`/topics/domain/${domain}`);
        setTopics(res.data);
        setSelectedTopic(res.data[0] || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDomain();
    fetchTopics();
  }, [domain]);

  if (!domainData) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,145,178,0.22),rgba(15,23,42,0.92))] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Learning Path
          </p>
          <h1 className="mt-4 text-4xl font-semibold">{domainData.name}</h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            {domainData.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-white/15 px-4 py-2">
              {topics.length} topics available
            </span>
            <span className="rounded-full border border-white/15 px-4 py-2">
              Study with video lectures
            </span>
            <span className="rounded-full border border-white/15 px-4 py-2">
              Take MCQ after each topic
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.35fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Topics</h2>
              <span className="text-sm text-slate-400">Learn in order</span>
            </div>

            <div className="mt-6 space-y-4">
              {topics.map((topic, index) => {
                const isActive = selectedTopic?._id === topic._id;

                return (
                  <button
                    key={topic._id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full rounded-2xl border p-5 text-left transition ${
                      isActive
                        ? "border-cyan-300/50 bg-cyan-400/10"
                        : "border-white/10 bg-slate-950/50 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                      Topic {index + 1}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {topic.name}
                    </h3>
                    <p className="mt-3 text-sm text-slate-400">
                      Watch the lecture first, then open the MCQ practice.
                    </p>
                  </button>
                );
              })}
            </div>

            {!topics.length && (
              <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-5 text-sm text-slate-400">
                No topics have been added to this learning path yet.
              </div>
            )}
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            {selectedTopic ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                      Current lesson
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold">
                      {selectedTopic.name}
                    </h2>
                  </div>

                  <button
                    onClick={() => navigate(`/quiz/${selectedTopic._id}`)}
                    className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Take MCQ Quiz
                  </button>
                </div>

                <div className="mt-8">
                  <LecturePlayer video={selectedTopic.videoUrl} />
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <LearningTip
                    title="Watch carefully"
                    description="Use the lesson video to build understanding before you try to answer questions."
                  />
                  <LearningTip
                    title="Revise key points"
                    description="Pause after the lecture and note important concepts, tools, or syntax."
                  />
                  <LearningTip
                    title="Test yourself"
                    description="Open the quiz when you feel ready and check how well the topic has actually landed."
                  />
                </div>
              </>
            ) : (
              <div className="flex min-h-80 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-950/40 text-center text-slate-400">
                Select a topic to start learning from this path.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

const LearningTip = ({ title, description }) => (
  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
  </div>
);

export default DomainPage;
