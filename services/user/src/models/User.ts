import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: String;
  email: String;
  image: String;
  bio: String;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    bio: String,
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
