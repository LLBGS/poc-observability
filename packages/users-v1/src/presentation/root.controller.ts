import { Router } from "express";
import usersRouter from "./http/users/users.controller";
import UsersConsumerController from "./messages/users-consumer.controller";

const routes = Router();

routes.use("/users", usersRouter);

new UsersConsumerController();

export default routes;
