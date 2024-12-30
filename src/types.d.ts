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

  interface Question {
    id: string;
    questionText: string;
    type: QuestionType;
    order: number;
    options: { id: string, optionText: string }[];
  }

  interface Tag {
    id: string;
    tagName: string;
  }

  interface Template {
    id: number;
    title: string;
    description: string;
    topic: TemplateTopic;
    createdAt: string;
    creator: {
      id: number;
      email: string;
  };
    responses: number;
    imageId: string;
    imageUrl: string;
    // likes: number;
    // hasLiked: boolean;
  }

  interface IComment {
    id: number;
    createdAt: string;
    content: string;
    author: {
      id: number;
      email: string;
    };
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

  interface ISingleTemplate {
    id: number;
    title: string;
    description: string;
    topic: TemplateTopic;
    createdAt: string;
    creator: {
      id: number;
      email: string;
    };
    tags: string[];
    questions: IQuestionServer[];
    accessControls: {
      id: number;
      email: string;
    }[];
    isPublic: boolean;
    imageId: string;
    imageUrl: string;
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

  interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
    message: string;
  }

  interface IRegisterResponse {
    message: string;
  }

  interface IRefreshTokenResponse {
    accessToken: string;
  }

}

export {};
