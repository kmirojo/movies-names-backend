import Server from "./models/Server";
import dotenv from "dotenv";

// Config Enviroment Variables
dotenv.config();

const server = new Server();

server.execute();
