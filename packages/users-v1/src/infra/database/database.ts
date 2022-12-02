import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/poc-observability";
export function connectToMongoDB(): void {
  if (mongoURI) {
    console.log("Connecting to MongoDB...");
    mongoose.connect(mongoURI, (err) => {
      if (err) {
        console.log("Error connecting to MongoDB");
        console.log(err);
      } else {
        console.log("Connected to MongoDB");
      }
    });
  } else {
    console.log("No MongoDB URI found");
  }
}

export function closeConnection(): void {
  mongoose.connection.close();
}
