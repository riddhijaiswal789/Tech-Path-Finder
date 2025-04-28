// backend/server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// 🌟 Existing Route - Contact form API
app.post('/api/send', (req, res) => {
  const { name, domain } = req.body;
  console.log("Received from frontend:", name, domain);
  res.json({ status: 'Received', name, domain });
});

// 🌟 New Route - Quiz Generation API (OpenRouter)
app.post("/api/generate-quiz", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    console.log("🔍 OpenRouter API response:", JSON.stringify(data, null, 2));

    const result = data.choices?.[0]?.message?.content;
    if (!result) throw new Error("No valid response from OpenRouter");

    res.json({ result });
  } catch (error) {
    console.error("❌ OpenRouter API error:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
