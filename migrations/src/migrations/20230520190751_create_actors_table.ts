import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("actors", (table) => {
        table.increments("actor_id")
        table.specificType("first_name", "varchar(30)").notNullable()
        table.specificType("last_name", "varchar(30)").notNullable()
        table.specificType("gender", "char(1)").notNullable()
        table.date("date_of_birth")
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("actors")
}
