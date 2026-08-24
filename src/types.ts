export type Slide = {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  analogy?: string;
  psychologyNote?: string;
  imageUrl?: string;
  imageAlt?: string;
  audioDescription?: string;
};

export type QuizQuestion = {
  id: string;
  textBefore: string;
  answer: string;
  acceptedAnswers: string[];
  distractor?: string;
  textAfter: string;
  hint: string;
  explanation: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  aliases: string[];
};

export type LessonQuiz = {
  title: string;
  questions: QuizQuestion[];
};

export type CaseStudy = {
  id: string;
  title: string;
  description: string;
  questions: string[];
  googleFormUrl: string;
};
