const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  generateQuestionPaper,
  postQuestion,
} = require("../controllers/questionController");

router.get("/get-all-questions", getAllQuestions);
router.post("/generate-question-paper", generateQuestionPaper);
router.post("/post-question", postQuestion)

module.exports = router;
