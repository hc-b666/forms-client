declare global {
  interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: UserRole;
  }

  interface IUserAdmin extends IUser {
    isBlocked: boolean;
  }

  interface IQuestionServer {
    id: number;
    questionText: string;
    type: QuestionType;
    order: number;
    options: {
      id: number;
      option: string;
    }[];
  }

  interface Form {
    id: number;
    filledAt: string;
    author: {
      id: number;
      email: string;
    };
  }

  interface FormResponses {
    form: {
      id: number;
      authorId: number;
      filledAt: Date;
    };
    questions: {
      id: number;
      questionText: string;
      type: QuestionType;
      order: number;
      options: {
        id: number;
        option: string
      }[];
    }[];
    responses: {
      id: number;
      formId: number;
      questionId: number;
      answer: string | null;
      optionId: number | null;
    }[];
  }

}

export {};
