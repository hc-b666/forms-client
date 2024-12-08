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

  interface ITag {
    id: number;
    tagName: string;
  }
}

export {};
