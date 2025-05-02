const express = require("express");
const router = express.Router();
const {
  generateQuestions,
  saveQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionsByTopic,
} = require("../controllers/questionController");

// POST /api/generate - Generate new questions
router.post("/generate", generateQuestions);

// POST /api/save - Save a single question
router.post("/save", saveQuestion);

// DELETE /api/questions/:id - Delete a question by ID
router.delete("/questions/:id", deleteQuestion);

// GET /api/questions - Get all questions
router.get("/questions", getAllQuestions);

// GET /api/questions/:topic - Get questions by topic
router.get("/questions/topic/:topic", getQuestionsByTopic);

module.exports = router;
