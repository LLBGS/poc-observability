import {
  Consumer,
  ConsumerSubscribeTopics,
  EachBatchPayload,
  Kafka,
  EachMessagePayload,
} from "kafkajs";
import { TMessagePayload } from "../core/domain/message-payload.type";

export default class UserKafkaConsumer {
  private kafkaConsumer: Consumer;
  private messageProcessor: TMessagePayload;

  public constructor(messageProcessor?: any) {
    this.messageProcessor = messageProcessor;
    this.kafkaConsumer = this.createKafkaConsumer();
  }

  public async startConsumer(): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: ["example-topic"],
      fromBeginning: false,
    };

    try {
      await this.kafkaConsumer.connect();
      await this.kafkaConsumer.subscribe(topic);

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload;
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
          console.log(`- ${prefix} ${message.key}#${message.value}`);
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  public async startBatchConsumer(): Promise<void> {
    let res: TMessagePayload = { useCase: "", message: {} };
    const topic: ConsumerSubscribeTopics = {
      topics: ["poc.user.service"],
      fromBeginning: false,
    };

    try {
      await this.kafkaConsumer.connect();
      await this.kafkaConsumer.subscribe(topic);
      await this.kafkaConsumer.run({
        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
          const { batch } = eachBatchPayload;
          for (const message of batch.messages) {
            const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`;
            console.log(
              `{\n\tprefix: ${prefix}\n\tmessage: ${message.value}\n\tkey: ${message.key}`
            );
            res = {
              useCase: message.key?.toString() || "",
              message: JSON.parse(String(message.value)),
            };
            this.messageProcessor = res;
          }
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.kafkaConsumer.disconnect();
  }

  private createKafkaConsumer(): Consumer {
    const kafka = new Kafka({
      clientId: "client-id",
      brokers: ["localhost:9092"],
    });
    const consumer = kafka.consumer({ groupId: "consumer-group" });
    return consumer;
  }
}
