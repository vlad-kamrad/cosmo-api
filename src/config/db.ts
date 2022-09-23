import { connect, connection } from "mongoose";
import { MONGO_CONNECTION_STRING } from "./config";

connect(MONGO_CONNECTION_STRING, () => console.log("MongoDB connected"));

connection.on("error", () => console.log("MongoDB connection error"));
connection.on("close", () => console.log("MongoDB connection close"));

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => connection.close(() => process.exit(0)));

export const isReady = () => connection.readyState === 1;
export default connection;
