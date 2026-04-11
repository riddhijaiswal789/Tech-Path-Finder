const express = require("express");
const router = express.Router();

const {
  submitQuiz,
  getMyAttempts,
} = require("../controllers/quizController");

const { protect } = require("../middleware/authMiddleware");

/* Submit quiz */
router.post("/submit", protect, submitQuiz);

/* Get user quiz history */
router.get("/my-attempts", protect, getMyAttempts);

module.exports = router;