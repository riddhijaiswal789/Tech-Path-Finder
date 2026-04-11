const QuizAttempt = require("../models/QuizAttempt");
const Topic = require("../models/Topic");
const Domain = require("../models/Domain");

/* ========================= */
/* USER PROGRESS */
/* ========================= */

exports.getUserProgress = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({
      user: req.user._id,
    }).populate("topic");

    const totalQuizzes = attempts.length;

    let averageScore = 0;

    if (totalQuizzes > 0) {
      averageScore =
        attempts.reduce((acc, a) => acc + a.percentage, 0) /
        totalQuizzes;

      averageScore = Number(averageScore.toFixed(2));
    }

    res.json({
      totalQuizzes,
      averageScore,
      attempts,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ========================= */
/* PERSONALIZED RECOMMENDATION */
/* ========================= */

exports.getPersonalizedRecommendation = async (req, res) => {
  try {
    const [attempts, topics, domains] = await Promise.all([
      QuizAttempt.find({ user: req.user._id }).populate("topic"),
      Topic.find().populate("domain", "name"),
      Domain.find().sort({ createdAt: 1 }),
    ]);

    if (!domains.length) {
      return res.json({
        type: "none",
        title: "No learning paths available yet",
        message: "Ask the admin to add domains and topics first.",
      });
    }

    if (!topics.length) {
      return res.json({
        type: "none",
        title: "No lessons available yet",
        message: "Learning paths exist, but topics have not been added yet.",
      });
    }

    const topicStats = new Map();
    const exploredDomainIds = new Set();

    attempts.forEach((attempt) => {
      if (!attempt.topic?._id) return;

      const topicId = attempt.topic._id.toString();
      const domainId = attempt.topic.domain?.toString?.() || "";

      if (domainId) {
        exploredDomainIds.add(domainId);
      }

      const current = topicStats.get(topicId) || {
        totalPercentage: 0,
        attempts: 0,
        latestAttemptAt: null,
        topic: attempt.topic,
      };

      current.totalPercentage += attempt.percentage || 0;
      current.attempts += 1;
      current.latestAttemptAt = attempt.createdAt;

      topicStats.set(topicId, current);
    });

    const weakestTopicEntry = [...topicStats.entries()]
      .map(([topicId, stat]) => ({
        topicId,
        topic: stat.topic,
        averagePercentage: stat.totalPercentage / stat.attempts,
        attempts: stat.attempts,
      }))
      .sort((a, b) => a.averagePercentage - b.averagePercentage)[0];

    if (weakestTopicEntry && weakestTopicEntry.averagePercentage < 60) {
      return res.json({
        type: "revise",
        title: `Revise ${weakestTopicEntry.topic.name}`,
        message:
          "Your recent performance suggests this topic needs another lecture pass before moving ahead.",
        reason: `Average score on this topic is ${Math.round(
          weakestTopicEntry.averagePercentage
        )}%.`,
        domain: weakestTopicEntry.topic.domain,
        topic: {
          _id: weakestTopicEntry.topic._id,
          name: weakestTopicEntry.topic.name,
        },
      });
    }

    const domainPerformance = new Map();

    [...topicStats.values()].forEach((stat) => {
      const domainId = stat.topic?.domain?.toString?.();
      if (!domainId) return;

      const current = domainPerformance.get(domainId) || {
        totalPercentage: 0,
        countedTopics: 0,
      };

      current.totalPercentage += stat.totalPercentage / stat.attempts;
      current.countedTopics += 1;

      domainPerformance.set(domainId, current);
    });

    const rankedExploredDomains = [...domainPerformance.entries()]
      .map(([domainId, stat]) => ({
        domainId,
        averagePercentage: stat.totalPercentage / stat.countedTopics,
      }))
      .sort((a, b) => b.averagePercentage - a.averagePercentage);

    for (const explored of rankedExploredDomains) {
      const nextTopic = topics.find((topic) => {
        const domainId = topic.domain?._id?.toString?.() || topic.domain?.toString?.();
        return (
          domainId === explored.domainId &&
          !topicStats.has(topic._id.toString())
        );
      });

      if (nextTopic) {
        return res.json({
          type: "continue",
          title: `Continue with ${nextTopic.name}`,
          message:
            "You are doing well in this learning path. The next unattempted lesson is the best fit right now.",
          reason: `Your strongest active path average is ${Math.round(
            explored.averagePercentage
          )}%.`,
          domain: nextTopic.domain,
          topic: {
            _id: nextTopic._id,
            name: nextTopic.name,
          },
        });
      }
    }

    const unexploredDomain = domains.find(
      (domain) => !exploredDomainIds.has(domain._id.toString())
    );

    if (unexploredDomain) {
      const starterTopic = topics.find((topic) => {
        const domainId = topic.domain?._id?.toString?.() || topic.domain?.toString?.();
        return domainId === unexploredDomain._id.toString();
      });

      return res.json({
        type: "explore",
        title: `Explore ${unexploredDomain.name}`,
        message:
          "You have covered your current path well enough to branch into a new learning area.",
        reason: "This domain has not been explored yet.",
        domain: {
          _id: unexploredDomain._id,
          name: unexploredDomain.name,
        },
        topic: starterTopic
          ? {
              _id: starterTopic._id,
              name: starterTopic.name,
            }
          : null,
      });
    }

    const strongestExplored = rankedExploredDomains[0];
    const strongestDomain = strongestExplored
      ? domains.find((domain) => domain._id.toString() === strongestExplored.domainId)
      : domains[0];

    return res.json({
      type: "review",
      title: `Review ${strongestDomain?.name || "your learning path"}`,
      message:
        "You have attempted all current topics in your active paths. Revisit strong areas or wait for new content.",
      reason: "All available topic quizzes in explored paths have been attempted.",
      domain: strongestDomain
        ? {
            _id: strongestDomain._id,
            name: strongestDomain.name,
          }
        : null,
      topic: null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
