interface IUserLogin {
  email: string;
  password: string;
}

interface IUserRegister extends IUserLogin {
  firstName: string;
  lastName: string;
  confirmPassword: string; // confirm password
}
export type { IUserLogin, IUserRegister };
