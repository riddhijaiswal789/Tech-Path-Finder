import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const AddQuiz = () => {

  const { domain } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState("");

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await API.get(`/topics/domain/${domain}`);
      setTopics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!topicId) {
      alert("Please select a topic");
      return;
    }

    try {

      await API.post("/questions", {
        topicId,
        question,
        options,
        correctAnswer
      });

      alert("Question added successfully");

      navigate("/admin");

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.95fr_1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,145,178,0.22),rgba(15,23,42,0.92))] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Quiz Authoring
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Create post-lesson MCQs.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Add a question set that helps learners verify what they understood
            from the lecture.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/20"
        >
          <h2 className="text-2xl font-semibold">Add Quiz Question</h2>

          <div className="mt-6 space-y-4">
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition focus:border-cyan-300/50"
            >
              <option value="">Select Topic</option>

              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            />

            {options.map((opt, i) => (
              <input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(e.target.value, i)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              />
            ))}

            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(Number(e.target.value))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition focus:border-cyan-300/50"
            >
              <option value={0}>Option 1</option>
              <option value={1}>Option 2</option>
              <option value={2}>Option 3</option>
              <option value={3}>Option 4</option>
            </select>

            <button className="w-full rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;
