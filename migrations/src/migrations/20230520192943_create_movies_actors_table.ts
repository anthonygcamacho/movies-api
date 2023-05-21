import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("movies_actors", (table) => {
        table.integer("movie_id").notNullable()
        table.integer("actor_id").notNullable()
        table.foreign("actor_id").references("actors.actor_id")
        table.foreign("movie_id").references("movies.movie_id")
        table.primary(["movie_id", "actor_id"], {
            constraintName: "movies_actors_pk",
            deferrable: "deferred",
        })
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("movies_actors")
}
