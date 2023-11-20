const allQuestions = require("../data/questions.json");

function getQuestionsByDifficulty(difficulty) {
  return allQuestions.filter((q) => q.difficulty === difficulty);
}

function generateQuestionPaperHelper(totalMarks, difficultyDistribution) {
  const paper = [];

  for (let [difficulty, distribution] of Object.entries(
    difficultyDistribution
  )) {
    const marksForThisDifficulty = Math.round(
      (distribution / 100) * totalMarks 
    );
    let marksCovered = 0;
    const filteredQuestions = getQuestionsByDifficulty(difficulty);

    while (marksCovered < marksForThisDifficulty) {
      const question = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
      paper.push(question);
      marksCovered += question.marks;
    }
  }

  return paper;
}

const getAllQuestions = (req, res) => {
  res.send(allQuestions);
};

const generateQuestionPaper = (req, res) => {
  const { totalMarks, difficultyDistribution } = req.body;
  const selectedQuestions = {};
  const questionPaper = generateQuestionPaperHelper(
    totalMarks,
    difficultyDistribution
  );
  res.send(questionPaper);
};

module.exports = {
  getAllQuestions,
  generateQuestionPaper,
};
