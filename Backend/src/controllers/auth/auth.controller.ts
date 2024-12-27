import { Request, Response } from "express";
import { HTTP_STATUS } from "src/constants/http.status";
import { MongoDBAuthRepository } from "src/repository/auth/mongo-db.repository";
import { Roles } from "src/repository/auth/repository";
import { AuthService } from "src/services/auth/auth.service";
import { z } from "zod";

const RegisterSchema = z
  .object(
    {
      email: z.string().email().max(255),
      password: z
        .string()
        .regex(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
          "password must contain a special character, upper case, lowercase"
        )
        .min(5, "must have atleast 8 chars")
        .max(255),
      confirmPassword: z.string(),
    },
    {
      required_error: "it is required",
    }
  )
  .refine(({ confirmPassword, password }) => confirmPassword == password, {
    message: "Passwords do not match",
    path: ["confirm password"],
  });

const register = async (req: Request, res: Response) => {
  // validate the request
  const validatedBody = RegisterSchema.parse(req.body);

  // call service to handle business logic
  const mongoRepo = new AuthService(new MongoDBAuthRepository());
  const registed = await mongoRepo.register({
    ...validatedBody,
    role: Roles.Admin,
  });

  res.status(HTTP_STATUS.CREATED).json({
    status: "success",
    data: { user: registed.email },
  });
};

const registerV2 = (req: Request, res: Response) => {
  // validate the request
  const validatedBody = RegisterSchema.parse(req.body);
  console.log("validatedBody", validatedBody);
  // call service to handle business logic

  // return the final response
  res.status(201).json({
    status: "success for V2",
    data: { user: validatedBody.email },
    message: "created a new user for V2",
  });
};

const login = (req: Request, res: Response) => {
  res.status(200).json({ status: "success" });
};

export { login, register, registerV2 };
