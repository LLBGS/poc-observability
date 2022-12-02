import { IUser } from "../interfaces/user.interface";

export class UserEntity implements IUser {
  public name: string;
  public email: string;
  public active: boolean;
}
