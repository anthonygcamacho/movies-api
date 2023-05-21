"use strict"

import knex from "knex"
import knexConfig from "./knexfile"

const env = process.env.NODE_ENV || "development"
const options = knexConfig[env]
const db = knex(options)

export default db
