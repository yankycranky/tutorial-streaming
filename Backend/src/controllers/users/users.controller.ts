import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "src/constants/http.status";
import { MongoDBAuthRepository } from "src/repository/auth/mongo-db.repository";
import { AuthService } from "src/services/auth/auth.service";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const users = [
  //   {
  //     email: "ankit.sagar@test.com",
  //   },
  //   {
  //     email: "ankit.sagar@xyz.com",
  //   },
  // ];

  const mongoRepo = new AuthService(new MongoDBAuthRepository());
  const users = await mongoRepo.getUsers();
  console.log(users);

  res.status(HTTP_STATUS.OK).send({ status: "success", data: { users } });
};
