declare global {
  interface IUser {
    id: string;
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
    formsCount: string;
    id: number;
    tags: string[];
    title: string;
    topic: string;
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
    id: number;
    title: string;
    description: string;
    email: string;
    createdAt: string;
    tags: string[];
    topic: string;
    comments: IComment[] | null;
    questions: IQuestionServer[];
  }
}

export {};
