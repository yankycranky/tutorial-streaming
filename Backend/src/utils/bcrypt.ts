import bcrypt from "bcrypt";

export const hashValue = async (val: string, salt: number = 10) => {
  return bcrypt.hash(val, salt);
};

export const compareHash = async (val1: string, hashedVal: string) => {
  return bcrypt.compare(val1, hashedVal).catch((_) => false);
};
