import { userModel } from "./../schemas/users.schema";
import { connect, Model, ModifyResult } from "mongoose";
import { IUser } from "../domain/interfaces/user.interface";
import { ACUserRepository } from "../repository/user.repository";
import { BaseRepository } from "../base/base-repository";
import { UserEntity } from "../domain/entitties/user.entity";
export class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(userModel);
  }
}
