import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 sm:p-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Create Account</h2>

          <p className="mt-3 text-slate-400">
            Start a structured learning journey and track your improvement over time.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              placeholder="Name"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-cyan-400 p-4 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Create Student Account
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              Login
            </Link>
          </p>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,145,178,0.22),rgba(15,23,42,0.92))] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Start Smart
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            Join a platform built around learning paths, lessons, and practice.
          </h1>
          <div className="mt-8 space-y-4">
            <AuthBullet text="Explore a tech path before jumping into progress metrics." />
            <AuthBullet text="Watch topic-based lectures in a clear sequence." />
            <AuthBullet text="Reinforce each lesson with timed MCQ practice." />
          </div>
        </section>
      </div>
    </div>
  );
}

const AuthBullet = ({ text }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200">
    {text}
  </div>
);

export default Register;
