import { Router } from "express";
import ProducerFactory from "../../config/producer";
const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  const { body } = req;
  const producer = new ProducerFactory();
  await producer.start();
  await producer.sendBatch("poc.user.service", [body]);
  await producer.shutdown();
  res.status(200).send("OK");
});

usersRouter.get("/", async (req, res) => {});

usersRouter.put("/:id", async (req, res) => {});

usersRouter.patch("/:id", async (req, res) => {});

usersRouter.delete("/:id", async (req, res) => {});

export default usersRouter;
