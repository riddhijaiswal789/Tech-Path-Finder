const QuizAttempt = require("../models/QuizAttempt");
const Question = require("../models/Question");

/* ========================= */
/* SUBMIT QUIZ */
/* ========================= */

exports.submitQuiz = async (req, res) => {
  try {
    const { topicId, answers } = req.body;

    let score = 0;
    let evaluatedAnswers = [];

    for (let ans of answers) {
      const question = await Question.findById(ans.questionId);

      const isCorrect = question.correctAnswer === ans.selectedOption;

      if (isCorrect) score++;

      evaluatedAnswers.push({
        question: question._id,
        selectedOption: ans.selectedOption,
        isCorrect,
      });
    }

    const totalQuestions = answers.length;

    const percentage = (score / totalQuestions) * 100;

    const quizAttempt = await QuizAttempt.create({
      user: req.user._id,
      topic: topicId,
      answers: evaluatedAnswers,
      score,
      totalQuestions,
      percentage,
    });

    res.json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions,
      percentage,
      quizAttempt,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ========================= */
/* GET USER QUIZ HISTORY */
/* ========================= */

exports.getMyAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({
      user: req.user._id,
    })
      .populate("topic", "name")
      .sort({ createdAt: -1 });

    res.json(attempts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};