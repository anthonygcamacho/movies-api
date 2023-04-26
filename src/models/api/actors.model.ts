import { PreparedStatement as PS } from "pg-promise"
import { db } from "../../services/dbconnect"

interface Actor {
    actor_id: number
    first_name: string
    last_name: string
    gender: string
    date_of_birth: Date
}

const getActorById = async (actorId: string): Promise<Actor> => {
    // Test SQL Injection
    // actorId = "1 OR (2=2)"
    // return await db.query(`SELECT * FROM actors WHERE actor_id = ${actorId}`)
    const getActorByIdQuery = new PS({
        name: "get-actor-by-id",
        text: "SELECT * FROM actors WHERE actor_id = $1",
        values: [actorId],
    })
    return await db.one(getActorByIdQuery)
}

const getActors = async (
    offset: number | undefined,
    limit: number | undefined
): Promise<Actor[] | void> => {
    const getActorsQuery = new PS({
        name: "get-actors",
        text: "SELECT * FROM actors OFFSET $1 LIMIT $2",
        values: [offset, limit || 1000],
    })
    return await db.many(getActorsQuery)
}

const getActorsByMovieId = async (movieId: string): Promise<Actor[]> => {
    const getActorsByMovieIdQuery = new PS({
        name: "get-actors-by-movie-id",
        text: "SELECT ac.actor_id, ac.first_name FROM actors ac JOIN movies_actors ma ON ma.actor_id = ac.actor_id WHERE ma.movie_id = $1",
        values: [movieId],
    })
    return await db.many(getActorsByMovieIdQuery)
}

export default {
    getActorsByMovieId,
    getActorById,
    getActors,
}
