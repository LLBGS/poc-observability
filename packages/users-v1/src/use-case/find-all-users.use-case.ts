import { IUser } from "../core/domain/interfaces/user.interface";
import { UseCase } from "../core/base/use-case";
import { CreateUserMapper } from "../core/mappers/create-users.mapper";
import { UserRepository } from "../core/models/users.models";
import { Response } from "express";

export class FindAllUsersUseCase implements UseCase<IUser> {
  private _createUserMapper: CreateUserMapper;

  constructor() {
    this._createUserMapper = new CreateUserMapper();
  }

  async execute(user: IUser, res: Response): Promise<void | IUser | IUser[]> {
    try {
      const userEntity = await this._createUserMapper.mapFrom(user);

      const repository = new UserRepository();
      return await repository.create(userEntity);
    } catch (error) {
      return error;
    }
  }
}
