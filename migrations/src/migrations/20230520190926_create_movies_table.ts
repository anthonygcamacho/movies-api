import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("movies", (table) => {
        table.increments("movie_id")
        table.specificType("movie_name", "varchar(50)").notNullable()
        table.integer("movie_length").notNullable()
        table.specificType("movie_lang", "varchar(20)").notNullable()
        table.date("release_date").notNullable()
        table.specificType("age_certificate", "varchar(5)").notNullable()
        table.integer("director_id").notNullable()
        table.foreign("director_id").references("directors.director_id")
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("movies")
}
