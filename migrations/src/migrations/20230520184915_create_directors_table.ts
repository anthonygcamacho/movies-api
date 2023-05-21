import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("directors", (table) => {
        table.increments("director_id")
        table.specificType("first_name", "varchar(30)").notNullable()
        table.specificType("last_name", "varchar(30)").notNullable()
        table.date("date_of_birth")
        table.specificType("nationality", "varchar(20)")
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("directors")
}
