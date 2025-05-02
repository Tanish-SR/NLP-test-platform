const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  topic: String,
  difficulty: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", questionSchema);
