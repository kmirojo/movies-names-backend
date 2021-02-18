import Movie from "./Movie";

class MovieList {
    private movies: Movie[];

    constructor() {
        this.movies = [
            new Movie("Avengers"),
            new Movie("Avengers: Age of Ultron"),
            new Movie("Avengers: Infinity War"),
            new Movie("Avengers: Endgame"),
        ];
    }

    public addMovie(name: string) {
        const newMovie = new Movie(name);
        this.movies.push(newMovie);
        return this.movies;
    }

    public removeMovie(id: string) {
        this.movies = this.movies.filter((movie) => movie.id !== id);
    }

    public getMovies() {
        return this.movies;
    }

    public increaseVotes(id: string) {
        this.movies = this.movies.map((movie) => {
            if (movie.id === id) {
                movie.votes += 1;
            }

            return movie;
        });
    }

    public changeMovieName(id: string, newName: string) {
        this.movies = this.movies.map((movie) => {
            if (movie.id === id) {
                movie.name = newName;
            }

            return movie;
        });
    }
}

export default MovieList;
