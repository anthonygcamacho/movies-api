"use strict"

require("dotenv").config()
import db from "./db"
import compareArrays from "./utils/compareArrays"
import consoleTableResults from "./utils/consoleTableResults"

const tables = [
    "users",
    "apikeys",
    "directors",
    "actors",
    "movies",
    "movie_revenues",
    "movies_actors",
]

let completelyTables: string[] = []
let destroyDBConnection = () => {
    if (compareArrays(completelyTables, tables)) {
        db.destroy()
    }
}

tables.forEach((table) => {
    db.select()
        .from("information_schema.columns")
        .where({ table_name: table })
        .then((resp) => {
            // console.log(resp)
            completelyTables.push(table)
            console.log("Table Name:", table)
            consoleTableResults(resp)
            destroyDBConnection()
        })
        .catch((err) => {
            if (err instanceof Error) {
                completelyTables.push(table)
                console.log(err)
                destroyDBConnection()
            }
        })
})

// db.raw("select * from users where user_id = ?", [1])
//     .then(function (resp) {
//         console.log(resp)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
