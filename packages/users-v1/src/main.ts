import * as dotenv from "dotenv";
import "module-alias/register";
import appConfig from "./config/root.config";
import { Express } from "express";
import { closeConnection } from "./infra/database/database";

dotenv.config({ path: __dirname + "/../.env" });

const express = require("express");
const newrelic = require("newrelic");
const app: Express = express();
const port = process.env.PORT;

appConfig(app);
newrelic.instrumentLoadedModule("express", express);
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
