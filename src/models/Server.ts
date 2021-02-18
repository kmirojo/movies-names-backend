import express, { Express } from "express";
import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import path from "path";
import cors from "cors";
import Socket from "./Socket";

class Server {
    private app: Express;
    private PORT: string;
    private server: HttpServer;
    private io: SocketServer;

    constructor() {
        // Express Server
        this.app = express();
        this.PORT = process.env.PORT || "3000";

        // Http Server
        this.server = new HttpServer(this.app);

        // Socket Server Configuration
        this.io = new SocketServer(this.server, {
            /* Configurations */
        });
    }

    private middlewares() {
        // Deploy Public Directory
        this.app.use(express.static(path.resolve(__dirname, "../public")));

        // Allow CORS
        this.app.use(cors());
    }

    private socketConfig() {
        new Socket(this.io);
    }

    public execute() {
        // Init Middlewares
        this.middlewares();

        // Init Sockets
        this.socketConfig();

        // Init Server
        this.server.listen(this.PORT, () => {
            console.log(`Server running on PORT => ${this.PORT}`);
        });
    }
}

export default Server;
