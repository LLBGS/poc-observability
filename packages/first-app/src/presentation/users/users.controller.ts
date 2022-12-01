import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  res.send("/users -> Hello World!");
});

export default usersRouter;
