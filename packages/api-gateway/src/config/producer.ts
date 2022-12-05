import { Kafka, logCreator, logLevel, Producer, ProducerBatch } from "kafkajs";

interface CustomMessageFormat {
  a: string;
}

interface Message {
  key: string;
  value: string;
}

interface TopicMessages {
  topic: string;
  messages: Message[];
}

export default class ProducerFactory {
  private producer: Producer;

  constructor() {
    this.producer = this.createProducer();
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect();
  }

  public async sendBatch(
    topic: string,
    useCase: string,
    messages: Array<CustomMessageFormat>
  ): Promise<void> {
    const kafkaMessages: Array<Message> = messages.map((message) => {
      return {
        key: useCase,
        value: JSON.stringify(message),
      };
    });

    const topicMessages: TopicMessages = {
      topic,
      messages: kafkaMessages,
    };
    console.log("topicMessages: ", topicMessages);
    const batch: ProducerBatch = {
      topicMessages: [topicMessages],
    };

    await this.producer.sendBatch(batch);
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: "producer-client",
      brokers: ["localhost:9092"],
    });

    return kafka.producer();
  }
}
