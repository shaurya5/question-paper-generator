const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')

router.get('/get-all-questions', questionController.getAllQuestions)
router.post('/generate-question-paper', questionController.generateQuestionPaper)

module.exports = router