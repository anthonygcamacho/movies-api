import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("movie_revenues", (table) => {
        table.increments("revenue_id")
        table.integer("movie_id").notNullable()
        table.foreign("movie_id").references("movies.movie_id")
        table.decimal("domestic_takings", 6, 2)
        table.decimal("international_takings", 6, 2)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("movie_revenues")
}
