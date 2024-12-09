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
    id: number;
    content: string;
    createdAt: string;
    user: {
      id: number;
      email: string;
    };
  }

  interface IQuestionServer {
    id: number;
    type: string;
    question: string;
    options: string[];
  }

  interface ITemplate {
    templateId: number;
    userId: number;
    title: string;
    description: string;
    email: string;
    createdAt: string;
    tags: string[];
    topic: string;
    comments: IComment[] | null;
    questions: IQuestionServer[];
  }

  interface IProfileTemplate {
    templateId: number;
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
}

export {};
