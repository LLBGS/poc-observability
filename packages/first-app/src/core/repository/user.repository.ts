import { IUser } from "../domain/interfaces/user.interface";

export abstract class UserRepository {
  abstract getUser(id: string): Promise<IUser>;
}
