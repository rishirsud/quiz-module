import type { Question } from "../types/question";

// Fisher-Yates Shuffle
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const processQuestions = (
  questions: Question[],
  config: { randomizeQuestions: boolean; randomizeAnswers: boolean },
): Question[] => {
  let processed = [...questions];

  if (config.randomizeQuestions) {
    processed = shuffleArray(processed);
  }

  if (config.randomizeAnswers) {
    processed = processed.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  }

  return processed;
};

export const calculateScore = (
  questions: Question[],
  userAnswers: Record<number, string[]>,
): number => {
  let correctCount = 0;

  questions.forEach((q) => {
    const userAnswer = userAnswers[q.id];
    if (!userAnswer) return;

    // Normalize to Sets for easy comparison
    const correctSet = new Set(q.correctAnswers);
    const userSet = new Set(userAnswer);

    // Check if sets are equal (same size and same elements)
    if (
      correctSet.size === userSet.size &&
      [...correctSet].every((val) => userSet.has(val))
    ) {
      correctCount++;
    }
  });

  return Math.round((correctCount / questions.length) * 100);
};
