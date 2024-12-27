export const enum Roles {
  User,
  Admin,
  Support,
}

export interface IUser {
  email: string;
  password: string;
  role: Roles;
}

export interface AuthRepository {
  getUsers: () => any;
  register: (user: IUser) => Promise<IUser>;
}
