const { GoogleGenerativeAI } = require("@google/generative-ai");
const Question = require("../models/questionModel");
require("dotenv").config();

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateQuestions = async (req, res) => {
  const { topic, difficulty, count } = req.body;

  try {
    // Access the Gemini model (using Gemini-1.5-flash for faster responses)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create the prompt for generating questions
    const prompt = `Generate ${count} ${difficulty} multiple choice questions on ${topic}. 
    Each question should have 4 options labeled A or B or C or D and mention the correct answer.
    the answers to these question should have answers as A or B or C or D.
    i dont want all the answers to be A or B or C or D.
    Return in JSON format like this:
    [
      {
        "question": "string",
        "options": ["A: option text", "B: option text", "C: option text", "D: option text"],
        "answer": "A"
      },
      ...
    ]`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    // Parse the JSON response
    let questions = [];
    try {
      // Extract JSON from the text (in case there's additional text)
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON array found, try parsing the entire text
        questions = JSON.parse(generatedText);
      }
    } catch (err) {
      console.error("Failed to parse Gemini response:", err.message);
      console.log("Raw response:", generatedText);
      return res.status(500).json({
        error: "Failed to parse Gemini response",
        rawResponse: generatedText,
      });
    }

    // We no longer automatically save questions - we'll let the user choose which ones to save
    res.status(200).json(questions);
  } catch (err) {
    console.error("Gemini API Error:", err.message);
    res.status(500).json({ error: "Failed to generate questions" });
  }
};

// New endpoint to save a single question
const saveQuestion = async (req, res) => {
  try {
    const { question, options, answer, topic, difficulty } = req.body;

    const newQuestion = new Question({
      question,
      options,
      answer,
      topic,
      difficulty,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    console.error("Error saving question:", err.message);
    res.status(500).json({ error: "Failed to save question" });
  }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Question.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error("Error deleting question:", err.message);
    res.status(500).json({ error: "Failed to delete question" });
  }
};

// Get all questions from the database
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

// Get questions by topic
const getQuestionsByTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    const questions = await Question.find({
      topic: { $regex: new RegExp(topic, "i") }, // Case-insensitive search
    }).sort({ createdAt: -1 });

    res.status(200).json(questions);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

module.exports = {
  generateQuestions,
  saveQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionsByTopic,
};
