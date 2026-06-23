const resumeText = require("./resumeData");

function retrieveContext(question) {
  return resumeText;
}

module.exports = retrieveContext;