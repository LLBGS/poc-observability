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
}
