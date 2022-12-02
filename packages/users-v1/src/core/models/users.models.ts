import { userModel } from "./../schemas/users.schema";
import { connect, Model, ModifyResult } from "mongoose";
import { IUser } from "../domain/interfaces/user.interface";
import { ACUserRepository } from "../repository/user.repository";
export class UserRepository implements ACUserRepository {
  constructor() {}

  public async createUser(user: IUser): Promise<IUser> {
    try {
      const newUser = await userModel.create(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public getUser(id: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  public updateUser(id: string, user: IUser): Promise<ModifyResult<IUser>> {
    throw new Error("Method not implemented.");
  }

  public deleteUser(id: string): Promise<ModifyResult<IUser>> {
    throw new Error("Method not implemented.");
  }
}
