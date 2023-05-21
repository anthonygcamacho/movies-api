import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
        table.increments("user_id")
        table.string("email").notNullable()
        table.specificType("password", "char(60)").notNullable()
        table.timestamp("created_at", { useTz: true }).notNullable()
        table.timestamp("last_login", { useTz: false })
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users")
}
