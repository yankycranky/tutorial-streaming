import mongoose from "mongoose";
import { MONGO_CONNECTION_STRING } from "../constants/env";

export const dbConnect = async () => {
  try {
    const res = await mongoose.connect(MONGO_CONNECTION_STRING, {
      dbName: "tutorial-streaming",
    });

    console.log("connected to mongo client");
  } catch (err) {
    console.log("failed to connect to db", err);
    process.exit(1);
  }
};
