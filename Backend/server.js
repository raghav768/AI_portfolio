// server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const retrieveContext = require("./rag");

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    const context = retrieveContext(question);

    const prompt = `
You are Raghavendra's AI Portfolio Assistant.

Answer ONLY using the resume information below.

Resume:
${context}

Question:
${question}
`;

    const result =
      await model.generateContent(prompt);

    const response =
      result.response.text();

    res.json({
      answer: response
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});