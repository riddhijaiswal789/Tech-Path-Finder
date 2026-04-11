import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AddDomain = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/domains", {
        name,
        description,
      });

      navigate("/admin");

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,145,178,0.22),rgba(15,23,42,0.92))] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Admin Setup
          </p>
          <h1 className="mt-4 text-3xl font-semibold md:text-4xl">Create a new learning path.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Add a domain that students can explore before they start watching
            topic lectures and taking quizzes.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 sm:p-8"
        >
          <h2 className="text-2xl font-semibold">Add Domain</h2>

          <div className="mt-6 space-y-5">
            <input
              placeholder="Domain Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-36 w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            />

            <button className="w-full rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Create Domain
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDomain;
