declare global {
  type UserRole = "ADMIN" | "USER";

  type TemplateTopic = "EDU" | "QUIZ" | "OTHER";

  type QuestionType = "TEXT" | "PARAGRAPH" | "MCQ" | "CHECKBOX";

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

  interface ITag {
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
    likes: number;
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
      questionId: number;
    }[];
  }

  interface ISingleTemplate {
    id: number;
    title: string;
    description: string;
    topic: string;
    createdAt: string;
    creator: {
      id: number;
      email: string;
    };
    tags: string[];
    questions: IQuestionServer[];
  }

  interface IProfileTemplate {
    id: number;
    title: string;
    description: string;
    topic: TemplateTopic;
    createdAt: string;
    responses: number;
    tags: string[];
  }

  interface IUserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  }

  interface Form {
    id: number;
    filledAt: string;
    author: {
      id: number;
      email: string;
    };
  }

  interface IResponse {
    questionId: number;
    questionText: string;
    type: QuestionType;
    responseId: number;
    answer: string | null;
    optionId: number | null;
    option: string | null;
    options: string[];
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

  interface IUserForm {
    id: number;
    filledAt: Date;
    template: {
      id: number;
      title: string;
      description: string;
      topic: TemplateTopic;
      tags: string[];
    };
  }
}

export {};
