import mongoose from "mongoose";
import brcypt from "bcrypt";
import { compareHash, hashValue } from "@utils/bcrypt";
import { Roles } from "src/repository/auth/repository";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  role: Roles;
  comparePassword: (val: string) => Promise<any>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    verified: { type: "Boolean", required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified(this.password)) return next();

  this.password = await hashValue(this.password, 8);
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareHash(val, this.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
