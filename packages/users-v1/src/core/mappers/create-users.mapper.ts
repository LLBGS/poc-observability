import { validate } from "class-validator";
import { Response } from "express";
import { resolve } from "path";
import { Mapper } from "../base/mapper";
import { CreateUserDTO } from "../domain/dtos/create-user.dto";
import { UserEntity } from "../domain/entitties/user.entity";
import { IUser } from "../domain/interfaces/user.interface";
export class CreateUserMapper extends Mapper<CreateUserDTO, UserEntity> {
  async mapFrom(payload: CreateUserDTO): Promise<UserEntity> {
    const mapped = Object.assign(new CreateUserDTO(), payload);
    return await this.validateOrRejectExample(mapped);
  }

  private validateOrReject(payload: CreateUserDTO): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      validate(payload).then((errors) => {
        if (errors.length > 0) {
          reject(errors);
        } else {
          resolve(payload);
        }
      });
    });
  }

  private async validateOrRejectExample(
    payload: CreateUserDTO
  ): Promise<UserEntity> {
    try {
      return await this.validateOrReject(payload);
    } catch (errors) {
      return errors;
    }
  }
}
