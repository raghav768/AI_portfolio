function chunkText(text, chunkSize = 500) {
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(
      text.slice(i, i + chunkSize)
    );
  }

  return chunks;
}

function retrieveRelevantChunks(
  question,
  chunks
) {
  const keywords =
    question.toLowerCase().split(" ");

  return chunks
    .filter(chunk =>
      keywords.some(word =>
        chunk.toLowerCase().includes(word)
      )
    )
    .slice(0, 3)
    .join("\n");
}

module.exports = {
  chunkText,
  retrieveRelevantChunks
};