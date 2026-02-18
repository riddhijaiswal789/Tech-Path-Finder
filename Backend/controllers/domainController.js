const Domain = require("../models/Domain");

/* ========================= */
/* CREATE DOMAIN */
/* ========================= */
exports.createDomain = async (req, res) => {
  try {
    const { name, description } = req.body;

    const domainExists = await Domain.findOne({ name });

    if (domainExists) {
      return res.status(400).json({ message: "Domain already exists" });
    }

    const domain = await Domain.create({
      name,
      description,
      createdBy: req.user._id, // from protect middleware
    });

    res.status(201).json(domain);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ========================= */
/* GET ALL DOMAINS */
/* ========================= */
exports.getDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ========================= */
/* GET SINGLE DOMAIN */
/* ========================= */
exports.getDomainById = async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }

    res.json(domain);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ========================= */
/* DELETE DOMAIN */
/* ========================= */
exports.deleteDomain = async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }

    await domain.deleteOne();

    res.json({ message: "Domain removed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
