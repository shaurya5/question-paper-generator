function getQuestionsByDifficulty(allQuestions, difficulty) {
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
      const question =
        filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
      paper.push(question);
      marksCovered += question.marks;
    }
  }

  return paper;
}

const doesQuestionExist = (questionStore, newQuestion) => {
  return questionStore.some((existingQuestion) => existingQuestion.question === newQuestion.question);
};

module.exports = {
  generateQuestionPaperHelper,
  doesQuestionExist,
};