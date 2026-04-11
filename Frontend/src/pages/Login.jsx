import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/auth-context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        email,
        password,
      });

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),rgba(15,23,42,0.92))] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Student Access
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            Return to your learning path and keep building momentum.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Sign in to continue watching lectures, attempt MCQs, and track your
            learning progress across each topic.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <AuthFeature title="Path-first" text="Resume from learning paths, not random content." />
            <AuthFeature title="Video-led" text="Study with guided topic lectures." />
            <AuthFeature title="MCQ-ready" text="Practice right after you learn." />
          </div>
        </section>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 sm:p-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Welcome Back</h2>

          <p className="mt-3 text-slate-400">
            Login to continue your learning journey.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              type="email"
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
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const AuthFeature = ({ title, text }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
  </div>
);

export default Login;
