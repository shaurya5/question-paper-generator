const allQuestions = require("../data/questions.json");
const { generateQuestionPaperHelper, doesQuestionExist } = require("../helpers/questionHelper");
const fs = require("fs");
const path = require("path");

const questionStorePath = path.join(__dirname, "../data/questions.json");
let questionStore = require(questionStorePath);

const getAllQuestions = (_, res) => {
  try {
    res.send(allQuestions);
  } catch (err) {
    console.error(err);
  }
};

const postQuestion = (req, res) => {
  try {
    const newQuestion = req.body;

    if (doesQuestionExist(questionStore, newQuestion)) {
      res.status(400).send("Question already exists");
      return;
    }
    questionStore.push(newQuestion);

    fs.writeFile(
      questionStorePath,
      JSON.stringify(questionStore, null, 2),
      (err) => {
        if (err) {
          res.status(500).send("Error while writing to file");
        } else {
          res.status(200).send("Question posted successfully");
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const generateQuestionPaper = (req, res) => {
  try {
    const { totalMarks, difficultyDistribution } = req.body;
    const questionPaper = generateQuestionPaperHelper(
      allQuestions,
      totalMarks,
      difficultyDistribution
    );
    res.send(questionPaper);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllQuestions,
  generateQuestionPaper,
  postQuestion,
};
