export interface Exercise {
  id: string;
  question: string;
  solution: string;
}

export interface Example {
  id: string;
  title: string;
  content: string;
  explanation: string; // Step-by-step breakdown
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string[]; // Key knowledge points
  examples: Example[]; // Illustrative examples
  exercises: Exercise[]; // Practice exercises
  quizzes: Quiz[]; // New: Multiple choice questions for unlocking
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  isError?: boolean;
}

export interface LessonProgress {
  score: number; // 0-100
  passed: boolean; // true if score >= 80
  isLocked: boolean;
}