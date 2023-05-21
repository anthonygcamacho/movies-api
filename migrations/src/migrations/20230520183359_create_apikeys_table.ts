import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("apikeys", (table) => {
        table.increments("api_key_id")
        table.integer("user_id").notNullable()
        table.foreign("user_id").references("users.user_id")
        table
            .specificType("api_key", "char(80)")
            .unique({ indexName: "api_key_unique_id", deferrable: "immediate" })
            .notNullable()
        table.timestamp("created_at", { useTz: true }).notNullable()
        table.timestamp("expires_at", { useTz: true })
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("apikeys")
}
