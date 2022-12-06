require("@aspecto/opentelemetry")({
  aspectoAuth: process.env.ASPECTO_API_KEY,
});
import "module-alias/register";
import * as dotenv from "dotenv";
import { Express } from "express";
import appConfig from "./config/root.config";
dotenv.config({ path: __dirname + "/../.env" });
import { closeConnection } from "./infra/database/database";
const express = require("express");
const app: Express = express();
const port = process.env.PORT;

appConfig(app);
const server = app.listen(port, () => {
  console.log(`User V1 listining in port ${port}`);
});

process.on("SIGTERM" || "SIGINT", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    closeConnection();
  });
});

export default app;
