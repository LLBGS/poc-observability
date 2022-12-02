import { IUser } from "../core/domain/interfaces/user.interface";
import { UseCase } from "../core/base/use-case";
import { CreateUserMapper } from "../core/mappers/create-users.mapper";
import { UserRepository } from "../core/models/users.models";
import { Response } from "express";
import { CreateUserDTO } from "../core/domain/dtos/create-user.dto";

export class CreateUserUseCase implements UseCase<IUser> {
  private _createUserMapper: CreateUserMapper;

  constructor() {
    this._createUserMapper = new CreateUserMapper();
  }

  async execute(user: IUser, res: Response): Promise<void | IUser | IUser[]> {
    try {
      const userEntity = await this._createUserMapper.mapFrom(user);
      if (userEntity instanceof CreateUserDTO) {
        const repository = new UserRepository();
        return await repository.createUser(userEntity);
      } else {
        res.status(400).json(userEntity);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
