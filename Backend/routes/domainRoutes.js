const express = require("express");
const router = express.Router();

const {
  createDomain,
  getDomains,
  getDomainById,
  deleteDomain,
} = require("../controllers/domainController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");


// Public routes
router.get("/", getDomains);
router.get("/:id", getDomainById);

// Protected routes
router.post("/", protect, adminOnly, createDomain);
router.delete("/:id", protect, adminOnly, deleteDomain);

module.exports = router;
