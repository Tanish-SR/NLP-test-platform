import { useState, useEffect } from "react";
import axios from "axios";

const SavedQuestionCard = ({ question, index, onDelete }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setDeleting(true);
      setError(null);

      try {
        await axios.delete(
          `http://localhost:5000/api/questions/${question._id}`
        );
        if (onDelete) {
          onDelete(question._id);
        }
      } catch (err) {
        console.error("Error deleting question:", err);
        setError("Failed to delete question. Please try again.");
        setDeleting(false);
      }
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
        <div className="flex gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Question {index}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {question.difficulty}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {question.topic}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`text-sm px-2 py-0.5 rounded ${
              deleting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
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

const SavedQuestions = () => {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noQuestionsFound, setNoQuestionsFound] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [selectedTopic]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    setNoQuestionsFound(false);

    try {
      let response;

      if (selectedTopic === "all") {
        response = await axios.get("http://localhost:5000/api/questions");
      } else {
        response = await axios.get(
          `http://localhost:5000/api/questions/topic/${selectedTopic}`
        );
      }

      setSavedQuestions(response.data);
      setNoQuestionsFound(response.data.length === 0);

      // Extract unique topics if we're viewing all questions
      if (selectedTopic === "all") {
        const uniqueTopics = [...new Set(response.data.map((q) => q.topic))];
        setTopics(uniqueTopics);
      }
    } catch (err) {
      console.error("Error fetching saved questions:", err);
      setError("Failed to load saved questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleDelete = (deletedId) => {
    setSavedQuestions((prev) => prev.filter((q) => q._id !== deletedId));

    // If we just deleted the last question with this topic, update the topic list
    if (selectedTopic === "all") {
      const remainingQuestions = savedQuestions.filter(
        (q) => q._id !== deletedId
      );
      const uniqueTopics = [...new Set(remainingQuestions.map((q) => q.topic))];
      setTopics(uniqueTopics);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Saved Questions
      </h2>

      <div className="mb-4">
        <label
          htmlFor="topicFilter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filter by Topic
        </label>
        <select
          id="topicFilter"
          value={selectedTopic}
          onChange={handleTopicChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Topics</option>
          {topics.map((topic, index) => (
            <option key={index} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && noQuestionsFound && (
        <p className="text-gray-500 text-center my-4">
          {selectedTopic === "all"
            ? "No saved questions found."
            : `No questions found for topic "${selectedTopic}".`}
        </p>
      )}

      {!loading && savedQuestions.length > 0 && (
        <div className="mb-8">
          {savedQuestions.map((question, index) => (
            <SavedQuestionCard
              key={question._id}
              question={question}
              index={index + 1}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedQuestions;
