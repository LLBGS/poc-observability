import { Schema, model, connect } from "mongoose";
import { IUser } from "../domain/interfaces/user.interface";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const userModel = model<IUser>("User", UserSchema);
