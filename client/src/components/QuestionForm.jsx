import { useState } from "react";
import axios from "axios";

const QuestionForm = ({
  setQuestions,
  setLoading,
  setError,
  setFormValues,
}) => {
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "medium",
    count: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "count" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate",
        formData
      );
      setQuestions(response.data);
      // Set the form values to be used in the QuestionList component
      setFormValues({
        topic: formData.topic,
        difficulty: formData.difficulty,
      });
    } catch (err) {
      console.error("Error generating questions:", err);
      setError(
        err.response?.data?.error ||
          "Failed to generate questions. Please try again."
      );
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a topic (e.g., JavaScript, World History, Biology)"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="count"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Questions
            </label>
            <input
              type="number"
              id="count"
              name="count"
              value={formData.count}
              onChange={handleChange}
              min="1"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate Questions
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
