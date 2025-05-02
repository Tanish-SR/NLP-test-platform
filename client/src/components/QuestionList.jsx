import { useState } from "react";
import axios from "axios";

const QuestionCard = ({
  question,
  index,
  topic,
  difficulty,
  onSaveSuccess,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      await axios.post("http://localhost:5000/api/save", {
        question: question.question,
        options: question.options,
        answer: question.answer,
        topic,
        difficulty,
      });

      setSaved(true);
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } catch (err) {
      console.error("Error saving question:", err);
      setError("Failed to save question. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleOptionClick = (optionLetter) => {
    setSelectedOption(optionLetter);
    // Automatically show the correct answer when an option is clicked
    setShowAnswer(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between mb-2">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Question {index + 1}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          {!saved ? (
            <button
              onClick={handleSave}
              disabled={saving}
              className={`text-sm px-2 py-0.5 rounded ${
                saving
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          ) : (
            <span className="text-sm text-green-600">✓ Saved</span>
          )}
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {question.question}
      </h3>

      <div className="space-y-2">
        {question.options.map((option, idx) => {
          const optionLetter = option.split(":")[0].trim();
          const isCorrect = optionLetter === question.answer;
          const isSelected = selectedOption === optionLetter;

          let optionClass = "p-3 rounded-md cursor-pointer ";

          if (isSelected || (showAnswer && isCorrect)) {
            // Selected option or correct answer when showing answer
            if (isCorrect) {
              optionClass += "bg-green-100 border border-green-300"; // Correct answer
            } else if (isSelected) {
              optionClass += "bg-red-100 border border-red-300"; // Wrong answer
            }
          } else {
            optionClass +=
              "bg-gray-50 border border-gray-200 hover:bg-gray-100"; // Default state
          }

          return (
            <div
              key={idx}
              className={optionClass}
              onClick={() => handleOptionClick(optionLetter)}
            >
              {option}
              {showAnswer && isCorrect && (
                <span className="ml-2 text-green-600 font-medium">
                  ✓ Correct
                </span>
              )}
            </div>
          );
        })}
      </div>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
    </div>
  );
};

const QuestionList = ({ questions, topic, difficulty, onSaveSuccess }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Generated Questions
      </h2>
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          question={question}
          index={index}
          topic={topic}
          difficulty={difficulty}
          onSaveSuccess={onSaveSuccess}
        />
      ))}
    </div>
  );
};

export default QuestionList;
