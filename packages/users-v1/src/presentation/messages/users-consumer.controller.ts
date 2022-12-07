import UserKafkaConsumer from "../../config/consumer";
import { CreateUserUseCase } from "../../use-case/create-users.user-case";

export default class UsersConsumerController {
  private _userKafkaConsumer: UserKafkaConsumer;

  constructor() {
    this._userKafkaConsumer = new UserKafkaConsumer();
    this._userKafkaConsumer.startBatchConsumer();
    this._userKafkaConsumer.messageProcessor$.subscribe((message) => {
      if (!message || !message.useCase) return;
      const { useCase, message: messagePayload } = message;

      const method = this[useCase].bind(this);
      if (!method) throw new Error("Method not found to useCase: " + useCase);
      method(messagePayload);
    });
  }

  public async create(payload: any): Promise<void> {
    console.log("payload to create an user", payload);
    const usersUseCase = new CreateUserUseCase();
    const users = await usersUseCase.execute({ ...payload });
    console.log("user created", users);
  }

  public async updateOne(payload: any): Promise<void> {
    console.log("payload to update an user", payload);
  }

  public async findAll(payload: any): Promise<void> {
    console.log("payload to find all users", payload);
  }

  public async findById(payload: any): Promise<void> {
    console.log("payload to find an user by id", payload);
  }

  public async deleteOne(payload: any): Promise<void> {
    console.log("payload to delete an user", payload);
  }
}
