import { PreparedStatement as PS } from "pg-promise"
import { db } from "../../services/dbconnect"

const getAllApiKeys = async (id: number) => {
    const getAllApiKeysQuery = new PS({
        name: "get-api-keys",
        text: "SELECT * FROM apikeys WHERE user_id = $1",
        values: [id],
    })
    return await db.query(getAllApiKeysQuery)
}

const insertApiKey = async (id: number, apiKeyEncoded: string, date: Date) => {
    const insertApiKeyQuery = new PS({
        name: "insert-api-key",
        text: "INSERT INTO apikeys(user_id, api_key, api_key_created) VALUES ($1, $2, $3) RETURNING api_key, api_key_created",
        values: [id, apiKeyEncoded, date],
    })
    return await db.query(insertApiKeyQuery)
}

const remoteApiKey = async (id: number, apiKeyEncoded: string) => {
    const remoteApiKeyQuery = new PS({
        name: "remove-api-key",
        text: "DELETE FROM apikeys WHERE user_id = $1 AND api_key = $2",
        values: [id, apiKeyEncoded],
    })
    return await db.query(remoteApiKeyQuery)
}

export default { getAllApiKeys, insertApiKey, remoteApiKey }
