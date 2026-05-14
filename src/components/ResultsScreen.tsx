import React from 'react';
// import { RefreshCw } from 'lucide-react';
import type { Question } from "../types/question";


interface ResultsScreenProps {
  questions: Question[];
  userAnswers: Record<number, string[]>;
  score: number;
  // onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ questions, userAnswers, score }) => {
  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold mb-4 shadow-inner">
          {score}%
        </div>
        <p className="text-gray-600">
          You scored {score}% on this quiz.
        </p>
      </div>

      <div className="space-y-6 pb-10">
        {questions.map((q, idx) => {
          const userAnswer = userAnswers[q.id] || [];
          const correctSet = new Set(q.correctAnswers);
          const userSet = new Set(userAnswer);
          const isCorrect = 
            correctSet.size === userSet.size && 
            [...correctSet].every(val => userSet.has(val));

          return (
            <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white bg-gray-500">
                  {idx + 1}
                </span>
                <h3 className="font-semibold text-gray-800">{q.question}</h3>
              </div>

              <div className="ml-9 space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-gray-600">Your Answer:</span>
                  <span className={`ml-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {userAnswer.length > 0 ? userAnswer.join(', ') : 'No answer selected'}
                  </span>
                </div>

                {!isCorrect && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Correct Answer:</span>
                    <span className="ml-2 text-green-700 font-medium">
                      {q.correctAnswers.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100 mt-4 shadow-lg">
        <button
          onClick={onRestart}
          className="w-full flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition-colors"
        >
          <RefreshCw size={18} className="mr-2" />
          Retake Quiz
        </button>
      </div> */}
    </div>
  );
};

export default ResultsScreen;