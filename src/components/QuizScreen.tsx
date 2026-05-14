import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import type { Question } from "../types/question";


interface QuizScreenProps {
  currentQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  userAnswers: Record<number, string[]>;
  handleAnswerChange: (
    questionId: number,
    option: string,
    type: "single" | "multiple",
  ) => void;
  handleNext: () => void;
  handlePrev: () => void;
  isLastQuestion: boolean;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  currentQuestion,
  currentIndex,
  totalQuestions,
  userAnswers,
  handleAnswerChange,
  handleNext,
  handlePrev,
  isLastQuestion,
}) => {
  const currentAnswer = userAnswers[currentQuestion.id] || [];

  return (
    <div className="flex flex-col h-full p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>
            {Math.round(((currentIndex + 1) / totalQuestions) * 100)}% Completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-grow overflow-y-auto pr-2">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {currentQuestion.question}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {currentQuestion.type === "multiple"
            ? "Select all that apply"
            : "Select one answer"}
        </p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = currentAnswer.includes(option);
            return (
              <label
                key={idx}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type={
                    currentQuestion.type === "multiple" ? "checkbox" : "radio"
                  }
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={isSelected}
                  onChange={() =>
                    handleAnswerChange(
                      currentQuestion.id,
                      option,
                      currentQuestion.type,
                    )
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            currentIndex === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ArrowLeft size={18} className="mr-2" />
          Previous
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Submit Quiz
            <CheckCircle size={18} className="ml-2" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Next
            <ArrowRight size={18} className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
