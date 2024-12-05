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
}

export {};
