import { Express } from "express";
import appMiddlewares from "../infra/middlewares/middawares";
export default function appConfig(app: Express): void {
  appMiddlewares(app);
}
