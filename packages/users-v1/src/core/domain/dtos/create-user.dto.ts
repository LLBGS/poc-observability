import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { IUser } from "../interfaces/user.interface";
export class CreateUserDTO implements IUser {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsBoolean()
  @IsNotEmpty()
  public active: boolean;
}
