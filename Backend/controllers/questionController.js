const Question = require("../models/Question");
const Topic = require("../models/Topic");

/* ========================= */
/* CREATE QUESTION */
/* ========================= */
exports.createQuestion = async (req, res) => {
  try {
    const { topicId, question, options, correctAnswer, difficulty } = req.body;

    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const newQuestion = await Question.create({
      topic: topicId,
      question,
      options,
      correctAnswer,
      difficulty,
      createdBy: req.user._id,
    });

    res.status(201).json(newQuestion);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ========================= */
/* GET QUESTIONS BY TOPIC */
/* ========================= */
exports.getQuestionsByTopic = async (req, res) => {
  try {
    const questions = await Question.find({
      topic: req.params.topicId,
    });

    res.json(questions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ========================= */
/* DELETE QUESTION */
/* ========================= */
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.deleteOne();

    res.json({ message: "Question removed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};