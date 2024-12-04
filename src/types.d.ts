declare global {
  interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
  }
}

export {};
