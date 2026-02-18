import { useParams, useLocation, useNavigate } from "react-router-dom";

const ScoreCard = () => {
  const { domain } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const decodedDomain = decodeURIComponent(domain);

  // Data from navigation state
  const score = location.state?.score;
  const total = location.state?.total;

  // If user refreshes page, fallback to localStorage
  const storedScores =
    JSON.parse(localStorage.getItem("quizScores")) || {};

  const fallback = storedScores[decodedDomain];

  const finalScore = score ?? fallback?.score ?? 0;
  const finalTotal = total ?? fallback?.total ?? 0;

  const percentage =
    finalTotal > 0
      ? Math.round((finalScore / finalTotal) * 100)
      : 0;

  let feedback = "";
  if (percentage >= 80) feedback = "Excellent 🚀";
  else if (percentage >= 50) feedback = "Good 👍";
  else feedback = "Needs Improvement 📘";

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 text-center">

      <h1 className="text-3xl font-bold mb-6">
        {decodedDomain} Quiz Result
      </h1>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 shadow-xl max-w-md w-full">

        <p className="text-xl mb-3">
          Score: {finalScore} / {finalTotal}
        </p>

        <p className="text-4xl font-bold text-indigo-400 mb-4">
          {percentage}%
        </p>

        <p className="text-lg mb-6">
          {feedback}
        </p>

        <button
          onClick={() =>
            navigate(`/domain/${encodeURIComponent(decodedDomain)}`)
          }
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition"
        >
          Back to Domain
        </button>

      </div>

    </div>
  );
};

export default ScoreCard;
