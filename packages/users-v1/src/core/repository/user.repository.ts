import { IUser } from "../domain/interfaces/user.interface";
import { ModifyResult } from "mongoose";
export abstract class ACUserRepository {
  abstract createUser(user: IUser): Promise<IUser>;
  abstract getUser(id: string): Promise<IUser>;
  abstract updateUser(id: string, user: IUser): Promise<ModifyResult<IUser>>;
  abstract deleteUser(id: string): Promise<ModifyResult<IUser>>;
}
