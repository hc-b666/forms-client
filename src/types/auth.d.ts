declare global {
  interface ILoginForm {
    email: string;
    password: string;
  }

  interface IRegisterForm {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }

  interface Ok {
    message: string;
  }

  interface LoginResponse extends Ok {
    accessToken: string;
    refreshToken: string;
    user: IUser;
  }

  interface RegisterResponse extends Ok {
  }

  interface RefreshResponse {
    accessToken: string;
  }

  interface VerifyResponse extends Ok {}
}

export {};
