const express = require("express");
const router = express.Router();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

require("dotenv").config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

router.post("/generate-quiz", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    console.log("🔍 OpenRouter API Response:", JSON.stringify(data, null, 2));

    const result = data.choices?.[0]?.message?.content;
    if (!result) throw new Error("No valid response from OpenRouter");

    res.json({ result });
  } catch (error) {
    console.error("❌ OpenRouter API error:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

module.exports = router;
