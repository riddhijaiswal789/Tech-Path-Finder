const express = require("express");
const router = express.Router();

const {
  getUserProgress,
  getPersonalizedRecommendation,
} = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/progress", protect, getUserProgress);
router.get("/recommendation", protect, getPersonalizedRecommendation);

module.exports = router;
