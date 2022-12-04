import { CreateUserUseCase } from "../../../use-case/create-users.user-case";
import { Router } from "express";
const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  const { body } = req;
  const usersUseCase = new CreateUserUseCase();
  const users = await usersUseCase.execute({ ...body }, res);
  res.json(users);
});

usersRouter.get("/", async (req, res) => {});

usersRouter.put("/:id", async (req, res) => {});

usersRouter.patch("/:id", async (req, res) => {});

usersRouter.delete("/:id", async (req, res) => {});

export default usersRouter;
