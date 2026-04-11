const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestionsByTopic,
  deleteQuestion,
} = require("../controllers/questionController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

/* Public Route */
router.get("/topic/:topicId", getQuestionsByTopic);

/* Admin Routes */
router.post("/", protect, adminOnly, createQuestion);
router.delete("/:id", protect, adminOnly, deleteQuestion);

module.exports = router;