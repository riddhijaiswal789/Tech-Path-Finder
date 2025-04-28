let questions = [];
let currentQuestion = 0;
let score = 0;
let timerInterval;
const QUESTION_TIME = 15;
let timeLeft = QUESTION_TIME;

async function generateQuiz() {
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;

  if (!difficulty) {
    alert("Please select a difficulty level.");
    return;
  }

  const prompt = `Generate 5 multiple-choice quiz questions about "${category}".
Each question must have exactly 4 options.
Return the result in pure JSON format like this:

[
  {
    "question": "What is the capital of France?",
    "options": ["Berlin", "Madrid", "Paris", "Lisbon"],
    "answer": 2
  }
]`;

  try {
    const res = await fetch("http://localhost:5000/api/generate-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    const rawText = data.result;

    let jsonText = "";
    try {
      const fallback = rawText.match(/\[\s*{[\s\S]*?}\s*\]/);
      if (!fallback) throw new Error("No JSON found in response");
      jsonText = fallback[0];
    } catch (e) {
      throw new Error("Could not parse generated response.");
    }

    questions = JSON.parse(jsonText);
    currentQuestion = 0;
    score = 0;
    openQuizWindow();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to load quiz.");
  }
}

function openQuizWindow() {
  const quizWindow = window.open("", "_blank", "width=800,height=600");
  quizWindow.document.write(`
    <html>
    <head><title>Quiz</title>
    <link rel="stylesheet" href="/frontend/css/quiz-style.css"></head>
    <style>
    body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
}

#timer {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

.question {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.question h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #ffd700;
}

.question p {
  font-size: 1.4rem;
  margin-bottom: 25px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
}

label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.15);
  padding: 12px 15px;
  border-radius: 12px;
  transition: background 0.3s ease;
}

label:hover {
  background: rgba(255, 255, 255, 0.25);
}

input[type="radio"] {
  transform: scale(1.2);
}

button {
  background: #ff6b6b;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  margin-top: 20px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  background: #ff4757;
  transform: scale(1.05);
}

#score {
  margin-top: 20px;
  font-size: 1.4rem;
  font-weight: bold;
}

    </style>
    <body>
      <div id="timer"></div>
      <div id="quiz"></div>
      <div id="score"></div>
      <script>
        const questions = ${JSON.stringify(questions)};
        let currentQuestion = 0;
        let score = 0;
        let timeLeft = ${QUESTION_TIME};
        let timerInterval;

        function startTimer() {
          document.getElementById("timer").innerText = "Time left: " + timeLeft + "s";
          timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").innerText = "Time left: " + timeLeft + "s";
            if (timeLeft <= 0) {
              clearInterval(timerInterval);
              alert("Time's up!");
              currentQuestion++;
              displayQuestion();
            }
          }, 1000);
        }

        function displayQuestion() {
          clearInterval(timerInterval);
          if (currentQuestion >= questions.length) {
            document.getElementById("quiz").innerHTML = "<h3>Quiz Completed!</h3>";
            document.getElementById("score").innerText = "Your Score: " + score + "/" + questions.length;
            return;
          }
          const q = questions[currentQuestion];
          let html = "<div class='question'><h3>" + (currentQuestion + 1) + "</h3><p>" + q.question + "</p><ul>";
          q.options.forEach((opt, i) => {
            html += "<li><label><input type='radio' name='option' value='" + i + "'> " + opt + "</label></li>";
          });
          html += "</ul><button onclick='submitAnswer()'>Submit</button></div>";
          document.getElementById("quiz").innerHTML = html;
          timeLeft = ${QUESTION_TIME};
          startTimer();
        }

        function submitAnswer() {
          clearInterval(timerInterval);
          const selected = document.querySelector("input[name='option']:checked");
          if (!selected) {
            alert("Please select an option");
            return;
          }
          const answer = parseInt(selected.value);
          if (answer === questions[currentQuestion].answer) score++;
          currentQuestion++;
          displayQuestion();
        }

        displayQuestion();
      </script>
    </body>
    </html>
  `);
  quizWindow.document.close();
}




