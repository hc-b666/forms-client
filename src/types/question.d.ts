declare global {
  interface Question {
    id: string;
    questionText: string;
    type: QuestionType;
    order: number;

    options: {
      id: string;
      optionText: string;
    }[];
  }
}

export {};
