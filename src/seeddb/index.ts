import * as path from "path"
import * as fs from "fs"
import wait from "wait"
import { db } from "../services/dbconnect"

// ----------------------------------------------------------------------------

const seedOrder = [
    "create.sql",
    "insert_actors.sql",
    "insert_directors.sql",
    "insert_movies.sql",
    "insert_movie_revenues.sql",
    "insert_movies_actors.sql",
]

const dbCreatePath = path.join(__dirname, "../../", "seedsql")

async function seedDB(): Promise<void> {
    for (let i = 0; i < seedOrder.length; i++) {
        console.log(`${dbCreatePath}/${seedOrder[i]}`)
        const seedQuery = fs.readFileSync(`${dbCreatePath}/${seedOrder[i]}`, {
            encoding: "utf8",
        })
        try {
            await db.none(seedQuery)
            console.log("Seeding Completed!")
            await wait(10000)
        } catch (err) {
            console.log("catch error", err)
        }
    }
}
seedDB()
