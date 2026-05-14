import React from "react";

interface StartScreenProps {
  onStart: () => void;
  randomizeEnabled: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  randomizeEnabled,
}) => (
  <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-6 animate-fade-in">
    <h1 className="text-3xl font-bold text-gray-800">Knowledge Quiz</h1>
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 max-w-md shadow-sm">
      <h2 className="text-lg font-semibold text-blue-800 mb-2">Instructions</h2>
      <ul className="text-left text-gray-600 space-y-2 text-sm">
        <li>Answer all questions to proceed.</li>
        <li>Some questions may have multiple correct answers.</li>
        <li>You can navigate back and forth between questions.</li>
        <li>Click "Submit" only when you are ready to finish.</li>
      </ul>
    </div>
    <button
      onClick={onStart}
      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md transform active:scale-95"
    >
      Begin Quiz
    </button>
    <p className="text-xs text-gray-400 mt-4">
      Randomization: {randomizeEnabled ? "Enabled" : "Disabled"}
    </p>
  </div>
);

export default StartScreen;
