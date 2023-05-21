require("dotenv").config()
import type { Knex } from "knex"

// Update with your config settings.

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: "pg",
        connection: process.env.VERCEL_POSTGRES_URL,
        // connection: process.env.MOVIESAPI_RDS_DATABASE_URL,
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
}

export default knexConfig
