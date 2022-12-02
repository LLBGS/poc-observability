import { Express } from "express";
import { connectToMongoDB } from "../infra/database/database";
import appMiddlewares from "../infra/middlewares/middawares";
export default function appConfig(app: Express): void {
  connectToMongoDB();
  appMiddlewares(app);
}
