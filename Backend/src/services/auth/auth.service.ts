import { AuthRepository, IUser } from "src/repository/auth/repository";

export class AuthService {
  repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async getUsers() {
    return this.repository.getUsers();
  }

  async register(user: IUser) {
    return this.repository.register(user);
  }
}
