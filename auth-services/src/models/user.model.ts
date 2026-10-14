import mongoose from "mongoose";

export interface IUser {
  fullName: string;
  password: string;
  email: string;
  role: "User" | "Worker" | "Admin";
  token: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "FullName is missing"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is missing"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is missing"],
      trim: true,
      minLength: [3, "Please provide atleast 3 character"],
      select: false
    },
    role: {
      type: String,
      enum: ["User", "Worker", "Admin"],
      default: "User",
    },
    // token:{
    //     type: String
    // }
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("User", userSchema);
