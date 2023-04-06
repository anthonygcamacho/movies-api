import env from "../config/env"
import { IMain } from "pg-promise"

const { DATABASE_URL } = env

const initOptions = {}
const pgp: IMain = require("pg-promise")(initOptions)

// -------------------------------------------------------------------------------

let cn
if (typeof DATABASE_URL === "string") {
    cn = DATABASE_URL
}

export const db = pgp(cn as string)
