import { Server as SocketServer, Socket as SocketIO } from "socket.io";
import MovieList from "./MoviesList";

class Socket {
    private io: SocketServer;
    private movieList: MovieList;

    constructor(io: SocketServer) {
        this.io = io;

        this.movieList = new MovieList();

        this.socketEvents();
    }

    private socketEvents() {
        // On Connection
        this.io.on("connection", (socket: SocketIO) => {
            console.log(`Client #${socket.id}: Connected`);

            // Create Events
            // Emit all current movies to the connected client
            socket.emit("current-movies", this.movieList.getMovies());

            socket.emit("welcome-message", {
                message: "Welcome to the Server",
                date: new Date(),
            });

            // Listen Events
            socket.on("vote-movie", ({ id }: { id: string }) => {
                this.movieList.increaseVotes(id);

                // Reminder:
                // this.io.emit: Sends information to all connected clients
                // socket.emit: Sends information only to the client that emmited the initial {vote-movie} event in this case.
                this.io.emit("current-movies", this.movieList.getMovies());
            });

            socket.on("delete-movie", ({ id }: { id: string }) => {
                this.movieList.removeMovie(id);
                this.io.emit("current-movies", this.movieList.getMovies());
            });

            socket.on(
                "change-movie-name",
                ({ id, name }: { id: string; name: string }) => {
                    this.movieList.changeMovieName(id, name);
                    this.io.emit("current-movies", this.movieList.getMovies());
                }
            );

            socket.on("new-movie", ({ name }: { name: string }) => {
                this.movieList.addMovie(name);
                this.io.emit("current-movies", this.movieList.getMovies());
            });
        });
    }
}

export default Socket;
