import { AuthRepository, IUser } from "./repository";
import User from "@models/users/users.model";

export class MongoDBAuthRepository implements AuthRepository {
  async getUsers() {
    const users = await User.find();
    console.log("users", users);
    return users;
  }

  async register(user: IUser) {
    const existingUser = await User.exists({ email: user.email });
    if (existingUser != null) {
      throw new Error("User already exists");
    }

    const newUser = await User.create({
      email: user.email,
      password: user.password,
      role: user.role,
    });

    return newUser;
  }
}
