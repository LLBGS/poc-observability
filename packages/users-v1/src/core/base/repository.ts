export abstract class Repository<TEntity> {
  abstract create(data: TEntity): Promise<TEntity>;
  abstract insertMany(data: TEntity[]): Promise<TEntity[]>;
  abstract updateMany(filter: object, data: object): Promise<TEntity[]>;
  abstract update(
    filter: Partial<TEntity>,
    data: Partial<TEntity>
  ): Promise<TEntity>;
  abstract updatePushArray(
    filter: Partial<TEntity>,
    data: TEntity
  ): Promise<TEntity>;
  abstract updatePullArray(
    filter: Partial<TEntity>,
    data: TEntity
  ): Promise<TEntity>;
  abstract findById(id: string): Promise<TEntity>;
  abstract countDocuments(filter: object): Promise<number>;
  abstract find(query: object): Promise<TEntity[]>;
  abstract findAll(filter: object): Promise<TEntity[]>;

  abstract findOne(filter: Partial<TEntity>): Promise<TEntity>;
  abstract delete(id: string): Promise<void>;
}
