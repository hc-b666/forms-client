declare global {
  interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
  }

  interface IQuestion {
    id: string;
    question: string;
    type: string;
    options: {
      id: string;
      value: string;
    }[];
  }

  interface ITag {
    id: string;
    value: string;
  }

  interface ITopTemplate {
    createdAt: string;
    email: string;
    responses: string;
    id: number;
    tags: string[];
    title: string;
    topic: string;
    totalLikes: string;
    hasLiked: boolean;
  }

  interface ILatestTemplate {
    createdAt: string;
    email: string;
    id: number;
    tags: string[];
    title: string;
    topic: string;
  }

  interface ITagServer {
    id: number;
    tagName: string;
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
    type: string;
    options: {
      id: number;
      option: string;
    }[];
  }

  interface ISingleTemplate {
    templateId: number;
    title: string;
    description: string;
    topic: string;
    createdAt: string;
    userId: number;
    email: string;
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
    type: 'short' | 'paragraph' | 'mcq' | 'checkbox';
    responseId: number;
    answer: string | null;
    optionId: number | null;
    option: string | null;
    options: string[];
  }
}

export {};
