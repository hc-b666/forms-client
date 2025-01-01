declare global {
  interface Comment {
    id: number;
    content: string;
    createdAt: Date;

    author: {
      id: number;
      email: string;
    };
  }
}

export {};
