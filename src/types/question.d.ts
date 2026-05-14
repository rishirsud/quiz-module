export type QuestionType = "single" | "multiple";

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswers: string[];
}

export interface QuizConfig {
  randomizeQuestions: boolean;
  randomizeAnswers: boolean;
}
