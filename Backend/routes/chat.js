const express = require("express");

const loadResume =
  require("../services/pdfLoader");

const {
  chunkText,
  retrieveRelevantChunks
} = require("../services/rag");

const askGemini =
  require("../services/gemini");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    const resumeText =
      await loadResume();

    const chunks =
      chunkText(resumeText);

    const context =
      retrieveRelevantChunks(
        question,
        chunks
      );

    const prompt = `
You are an AI portfolio assistant.

Answer ONLY from the context.

Context:
${context}

Question:
${question}
`;

    const answer =
      await askGemini(prompt);

    res.json({
      answer
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error"
    });
  }
});

module.exports = router;