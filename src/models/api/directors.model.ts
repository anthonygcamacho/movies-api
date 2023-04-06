import { PreparedStatement as PS } from "pg-promise"
import { db } from "../../services/dbconnect"

interface Director {
    director_id: number
    first_name: string
    last_name: string
    date_of_birth: Date
    nationality: string
}

const getDirectorById = async (directorId: string): Promise<Director> => {
    const getDirectorByIdQuery = new PS({
        name: "get-director-by-id",
        text: "SELECT * FROM directors WHERE director_id = $1",
        values: [directorId],
    })
    return await db.one(getDirectorByIdQuery)
}

const getDirectors = async (): Promise<Director[]> => {
    const getDirectorsQuery = new PS({
        name: "get-directors",
        text: "SELECT * FROM directors",
    })
    return await db.many(getDirectorsQuery)
}

export default {
    getDirectorById,
    getDirectors,
}
