import { useState, useEffect } from "react";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";
import SavedQuestions from "./components/SavedQuestions";
import "./index.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("generate"); // 'generate' or 'saved'
  const [formValues, setFormValues] = useState({
    topic: "",
    difficulty: "",
  });
  const [savedQuestionsKey, setSavedQuestionsKey] = useState(0); // Used to force refresh of SavedQuestions component

  // Handle successful save to refresh the saved questions list when navigating to it
  const handleSaveSuccess = () => {
    // This will be used to refresh the SavedQuestions component when a question is saved
    setSavedQuestionsKey((prevKey) => prevKey + 1);
  };

  // When switching to the saved tab, refresh the saved questions list
  useEffect(() => {
    if (activeTab === "saved") {
      setSavedQuestionsKey((prevKey) => prevKey + 1);
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600">
            NLP Test Question Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Generate and manage multiple-choice questions on any topic
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "generate"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("generate")}
          >
            Generate Questions
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "saved"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved Questions
          </button>
        </div>

        <main>
          {activeTab === "generate" && (
            <>
              <QuestionForm
                setQuestions={setQuestions}
                setLoading={setLoading}
                setError={setError}
                setFormValues={setFormValues}
              />

              {loading && (
                <div className="flex justify-center my-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
                  <p>{error}</p>
                </div>
              )}

              {questions.length > 0 && !loading && (
                <QuestionList
                  questions={questions}
                  topic={formValues.topic}
                  difficulty={formValues.difficulty}
                  onSaveSuccess={handleSaveSuccess}
                />
              )}
            </>
          )}

          {activeTab === "saved" && <SavedQuestions key={savedQuestionsKey} />}
        </main>
      </div>
    </div>
  );
}

export default App;
