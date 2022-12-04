import UserKafkaConsumer from "../../config/consumer";

export default class UsersConsumerController {
  private _userKafkaConsumer: UserKafkaConsumer;

  constructor() {
    this._userKafkaConsumer = new UserKafkaConsumer();
    this._userKafkaConsumer.startBatchConsumer();
  }
}
