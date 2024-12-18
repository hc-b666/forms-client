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

  interface IQuestion {
    id: string;
    question: string;
    type: QuestionType;
    options: ITag[];
  }

  interface ITag {
    id: string;
    tagName: string;
  }

  interface ITopTemplate {
    id: number;
    title: string;
    description: string;
    topic: string;
    createdAt: string;
    email: string;
    responses: number;
    totalLikes: number;
    hasLiked: boolean;
  }

  interface ILatestTemplate {
    id: number;
    title: string;
    description: string;
    topic: string;
    createdAt: string;
    email: string;
  }

  interface IComment {
    commentId: number;
    content: string;
    createdAt: string;
    authorId: number;
    email: string;
  }

  interface IQuestionServer {
    id: number;
    question: string;
    type: QuestionType;
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
    }
    tags: string[];
    questions: IQuestionServer[];
    comments: IComment[];
  }

  interface IProfileTemplate {
    id: number;
    title: string;
    createdAt: string;
    topic: string;
    tags: string[];
    responses: string;
  }

  interface IUserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  }

  interface IForm {
    formId: number;
    filledBy: number;
    templateTitle: string;
    filledAt: string;
    email: string;
  }

  interface IResponse {
    questionId: number;
    question: string;
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
}

export {};
