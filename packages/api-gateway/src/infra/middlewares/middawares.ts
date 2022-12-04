import bodyParser = require("body-parser");
import cors = require("cors");
import { Express } from "express";
import express = require("express");
import routes from "../../presentation/root.controller";

export default function appMiddlewares(app: Express): void {
  try {
    bodyParser.urlencoded({ extended: true });
    app.use(cors());
    app.use(express.json());
    app.use(routes);
  } catch (error) {
    throw new Error("Error in appMiddlewares");
  }
}
