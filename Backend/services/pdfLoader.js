const fs = require("fs");
const pdf = require("pdf-parse");

async function loadResume() {
  const dataBuffer = fs.readFileSync(
    "./data/Raghavendra_GenAI_FullStack.pdf"
  );

  const data = await pdf(dataBuffer);

  return data.text;
}

module.exports = loadResume;