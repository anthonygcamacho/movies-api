import { PreparedStatement as PS } from "pg-promise"
import { db } from "../../services/dbconnect"

interface Movie {
    movie_id: number
    movie_name: string
    movie_length: number
    movie_lang: string
    release_date: Date
    age_certificate: string
    director_id: number
}

const getMovieById = async (movieId: string): Promise<Movie> => {
    const getMovieByIDQuery = new PS({
        name: "get-movie-by-id",
        text: "SELECT * FROM movies WHERE movie_id = $1",
        values: [movieId],
    })
    return await db.one(getMovieByIDQuery)
}

const getMovies = async (
    offset: number | undefined,
    limit: number | undefined
): Promise<Movie[]> => {
    const getMoviesQuery = new PS({
        name: "get-movies",
        text: "SELECT * FROM movies OFFSET $1 LIMIT $2",
        values: [offset, limit || 1000],
    })
    return await db.many(getMoviesQuery)
}

const getMoviesByActorId = async (actorId: string): Promise<Movie[]> => {
    const getActorsMoviesByIdQuery = new PS({
        name: "get-movies-by-actor-id",
        text: "SELECT mo.movie_id, mo.movie_name FROM movies mo JOIN movies_actors ma ON ma.movie_id = mo.movie_id WHERE ma.actor_id = $1",
        values: [actorId],
    })
    return await db.many(getActorsMoviesByIdQuery)
}

const getMoviesByDirectorId = async (directorId: string): Promise<Movie[]> => {
    const getMoviesByDirectorIdQuery = new PS({
        name: "get-movies-by-director-id",
        text: "SELECT mo.movie_id, mo.movie_name FROM movies mo JOIN directors dir ON mo.director_id = dir.director_id WHERE mo.director_id = $1",
        values: [directorId],
    })
    return await db.many(getMoviesByDirectorIdQuery)
}

const getRevenueByMovieId = async (movieId: string): Promise<Movie[]> => {
    const getRevenueByMovieIdQuery = new PS({
        name: "get-revenue-by-movie-id",
        text: "SELECT mo.movie_id, mo.movie_name, mr.domestic_takings, mr.international_takings FROM movie_revenues mr JOIN movies mo USING (movie_id) WHERE mr.movie_id = $1",
        values: [movieId],
    })
    return await db.many(getRevenueByMovieIdQuery)
}

export default {
    getRevenueByMovieId,
    getMoviesByDirectorId,
    getMoviesByActorId,
    getMovieById,
    getMovies,
}
