import { Model } from "mongoose";
import { Repository } from "./repository";

export class BaseRepository<TEntity> extends Repository<TEntity> {
  constructor(private readonly model: Model<TEntity>) {
    super();
  }

  async create(data: TEntity): Promise<TEntity> {
    const createdEntity = new this.model(data);
    await createdEntity.save();
    return createdEntity;
  }

  async insertMany(data: TEntity[]): Promise<TEntity[]> {
    throw new Error("Method not implemented.");
  }

  async updateMany(filter: object, data: object): Promise<TEntity[]> {
    throw new Error("Method not implemented.");
  }

  async update(
    filter: Partial<TEntity>,
    data: Partial<TEntity>
  ): Promise<TEntity> {
    throw new Error("Method not implemented.");
  }

  async updatePushArray(
    filter: Partial<TEntity>,
    data: TEntity
  ): Promise<TEntity> {
    throw new Error("Method not implemented.");
  }

  async updatePullArray(
    filter: Partial<TEntity>,
    data: TEntity
  ): Promise<TEntity> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<TEntity> {
    throw new Error("Method not implemented.");
  }

  async countDocuments(filter: object): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async find(query: object): Promise<TEntity[]> {
    throw new Error("Method not implemented.");
  }

  async findAll(filter: object): Promise<TEntity[]> {
    throw new Error("Method not implemented.");
  }

  async findOne(filter: Partial<TEntity>): Promise<TEntity> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
