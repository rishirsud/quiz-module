import { useState } from "react";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";
import type { Question, QuizConfig } from "./types/question";
import { processQuestions, calculateScore } from "./utils/quizUtils";
import questionsData from "./data/questions.json";

// CONFIGURATION: Toggle these to enable/disable randomization
const CONFIG: QuizConfig = {
  randomizeQuestions: false, // Set to false to keep original order
  randomizeAnswers: true, // Set to false to keep original option order
};

type GameState = "start" | "quiz" | "results";

function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [score, setScore] = useState<number>(0);

  // Initialize quiz when starting
  const handleStart = () => {
    // Process questions (shuffle if enabled)
    const processed = processQuestions(questionsData as Question[], CONFIG);
    setQuestions(processed);
    setUserAnswers({}); // Clear previous answers
    setCurrentQuestionIndex(0);
    setGameState("quiz");
  };

  // Handle answer selection
  const handleAnswerChange = (
    questionId: number,
    option: string,
    type: "single" | "multiple",
  ) => {
    setUserAnswers((prev) => {
      const currentSelection = prev[questionId] || [];

      if (type === "single") {
        // For single choice, replace the array with just the new option
        return {
          ...prev,
          [questionId]: [option],
        };
      } else {
        // For multiple choice, toggle the option in the array
        const isSelected = currentSelection.includes(option);
        const newSelection = isSelected
          ? currentSelection.filter((item) => item !== option)
          : [...currentSelection, option];

        return {
          ...prev,
          [questionId]: newSelection,
        };
      }
    });
  };

  // Navigate to next question or submit
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate score and go to results
      const finalScore = calculateScore(questions, userAnswers);
      setScore(finalScore);
      setGameState("results");
    }
  };

  // Navigate to previous question
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Restart the quiz
  // const handleRestart = () => {
  //   setGameState("start");
  //   setUserAnswers({});
  //   setCurrentQuestionIndex(0);
  // };

  // Render the appropriate screen based on gameState
  return (
    <div className="h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      {/* Main Container - Fixed height for iframe compatibility */}
      <div className="w-full h-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* Header (Optional branding) */}
        <div className="bg-blue-600 p-4 text-white text-center shadow-md">
          <h1 className="font-bold text-lg tracking-wide">Change Title later</h1>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-hidden relative">
          {gameState === "start" && (
            <StartScreen
              onStart={handleStart}
              randomizeEnabled={CONFIG.randomizeQuestions}
            />
          )}

          {gameState === "quiz" && (
            <QuizScreen
              currentQuestion={questions[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              userAnswers={userAnswers}
              handleAnswerChange={handleAnswerChange}
              handleNext={handleNext}
              handlePrev={handlePrev}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
            />
          )}

          {gameState === "results" && (
            <ResultsScreen
              questions={questions}
              userAnswers={userAnswers}
              score={score}
              // onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
