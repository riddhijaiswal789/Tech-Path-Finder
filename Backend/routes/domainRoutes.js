const express = require("express");
const router = express.Router();
const {
  createDomain,
  getDomains,
  getDomainById,
  deleteDomain,
} = require("../controllers/domainController");

const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getDomains);
router.get("/:id", getDomainById);

// Protected routes
router.post("/", protect, createDomain);
router.delete("/:id", protect, deleteDomain);

module.exports = router;
