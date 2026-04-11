import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [domains, setDomains] = useState([]);
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchDomains();
    fetchTopics();
    fetchUsers();
  }, []);

  const fetchDomains = async () => {
    try {
      const res = await API.get("/domains");
      setDomains(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopics = async () => {
    try {
      const res = await API.get("/topics");
      setTopics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDomain = async (id) => {
    if (!window.confirm("Delete this domain?")) return;

    await API.delete(`/domains/${id}`);
    fetchDomains();
  };

  const deleteTopic = async (id) => {
    if (!window.confirm("Delete this topic?")) return;

    await API.delete(`/topics/${id}`);
    fetchTopics();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="flex flex-wrap items-start justify-between gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),rgba(15,23,42,0.92))] p-8 md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
              Admin Control
            </p>
            <h1 className="mt-4 text-3xl font-semibold md:text-4xl">Content Management Hub</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Manage learning paths, topics, quizzes, and users from one place
              while keeping the student journey organized.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-domain")}
            className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            + Add Domain
          </button>
        </section>

        <section className="mt-10">
          <h2 className="mb-6 text-xl text-cyan-300">Domains</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {domains.map((domain) => (
              <div
                key={domain._id}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{domain.name}</h3>
                <p className="mb-5 text-slate-400">{domain.description}</p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate(`/admin/add-topic/${domain._id}`)}
                    className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-200 transition hover:bg-emerald-500/25"
                  >
                    Add Topic
                  </button>

                  <button
                    onClick={() => navigate(`/admin/add-quiz/${domain._id}`)}
                    className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
                  >
                    Add Quiz
                  </button>

                  <button
                    onClick={() => deleteDomain(domain._id)}
                    className="rounded-full border border-rose-500/40 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-xl text-cyan-300">Topics</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {topics.map((topic) => (
              <div
                key={topic._id}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{topic.name}</h3>
                <p className="mb-5 text-slate-400">
                  Domain: {topic.domain?.name || "Unknown"}
                </p>

                <a
                  href={topic.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-5 block rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/15"
                >
                  Open lecture video
                </a>

                <button
                  onClick={() => deleteTopic(topic._id)}
                  className="rounded-full border border-rose-500/40 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-500/10"
                >
                  Delete Topic
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-xl text-cyan-300">Users</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {users.map((user) => (
              <div
                key={user._id}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
              >
                <h3 className="font-semibold">{user.name}</h3>
                <p className="mb-4 mt-2 text-slate-400">{user.email}</p>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="rounded-full border border-rose-500/40 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-500/10"
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
