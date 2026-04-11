const Topic = require("../models/Topic");
const Domain = require("../models/Domain");

/* CREATE TOPIC */
exports.createTopic = async (req, res) => {
  try {

    const { name, videoUrl, domainId } = req.body;

    if (!name || !videoUrl || !domainId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const domain = await Domain.findById(domainId);

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }

    const topic = await Topic.create({
      name,
      videoUrl,
      domain: domainId,
      createdBy: req.user?._id
    });

    res.status(201).json(topic);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL TOPICS */
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate("domain", "name")
      .sort({ createdAt: -1 });

    res.json(topics);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET TOPICS BY DOMAIN */
exports.getTopicsByDomain = async (req, res) => {
  try {

    const topics = await Topic.find({
      domain: req.params.domainId
    });

    res.json(topics);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE TOPIC */
exports.deleteTopic = async (req, res) => {
  try {

    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    await topic.deleteOne();

    res.json({ message: "Topic removed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
