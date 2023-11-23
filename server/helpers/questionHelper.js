function shuffleQuestions(allQuestions) {
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = allQuestions[i];
    allQuestions[i] = allQuestions[j];
    allQuestions[j] = temp;
  }
  return allQuestions;
}

function getQuestionsByDifficulty(allQuestions, difficulty) {
  allQuestions = allQuestions.filter((q) => q.difficulty === difficulty);
  return shuffleQuestions(allQuestions)
}

function generateQuestionPaperHelper(allQuestions, totalMarks, difficultyDistribution) {
  const paper = [];
  let generatedTotalMarks = 0; // Variable to track the total marks generated

  for (let [difficulty, distribution] of Object.entries(difficultyDistribution)) {
    const marksForThisDifficulty = Math.round((distribution / 100) * totalMarks);
    let marksCovered = 0;
    const filteredQuestions = getQuestionsByDifficulty(allQuestions, difficulty);

    while (marksCovered < marksForThisDifficulty) {
      const question = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
      paper.push(question);
      marksCovered += question.marks;
      generatedTotalMarks += question.marks; // Update the generated total marks
    }
  }

  // Check if the generated total marks match the expected totalMarks
  if (generatedTotalMarks !== totalMarks) {
    return [];
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