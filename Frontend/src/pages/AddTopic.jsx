import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const AddTopic = () => {

  const { domain } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const isYoutubeLink =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !videoUrl) {
      alert("Please fill all fields");
      return;
    }

    try {

      await API.post("/topics", {
        name,
        videoUrl,
        domainId: domain
      });

      alert("Topic added successfully");

      navigate("/admin");

    } catch (err) {
      console.error(err);
      alert("Failed to create topic");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,145,178,0.22),rgba(15,23,42,0.92))] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Topic Builder
          </p>
          <h1 className="mt-4 text-3xl font-semibold md:text-4xl">Add a lesson to this path.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Each topic should guide the student with a focused lecture before
            they move to MCQ practice.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 sm:p-8"
        >
          <h2 className="text-2xl font-semibold">Add Topic</h2>

          <div className="mt-6 space-y-5">
            <input
              placeholder="Topic Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            />

            <input
              placeholder="YouTube Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            />

            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-400">
              {videoUrl ? (
                isYoutubeLink ? (
                  <span className="text-emerald-300">
                    Lecture link looks valid. Students will be able to watch it
                    inside the topic page.
                  </span>
                ) : (
                  <span className="text-amber-300">
                    Use a YouTube link like `youtube.com/watch?v=...` or
                    `youtu.be/...` for the best embedded lecture experience.
                  </span>
                )
              ) : (
                <span>
                  Add the lecture URL here so this topic has a playable video
                  lesson.
                </span>
              )}
            </div>

            <button className="w-full rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Create Topic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTopic;
