import { RequestHandler } from "express"
import apiKey from "../../utils/apikey"
import { formatDate } from "../../utils/dateFormat"

// -------------------------------------------------------------------------------

interface ApiKeysResults {
    api_key_id: number
    user_id: number
    api_key: string
    api_key_created: Date
    expires: null
}

const apiKeysGetAll: RequestHandler = async (req, res): Promise<void> => {
    let id = req.user as number
    let results = await apiKey.getAll(id, res)
    results = results.map((result: ApiKeysResults) => {
        return {
            api_key: result.api_key,
            api_key_created: formatDate(result.api_key_created),
            expires: result.expires,
        }
    })
    res.status(200).json(results)
}

const apiKeyCreate: RequestHandler = async (req, res): Promise<void> => {
    let id = req.user as number
    const results = await apiKey.create(id, res)
    res.status(201).json({
        apiKey: results[0].api_key,
        apiKeyCreated: formatDate(results[0].api_key_created),
    })
}

const apiKeyDelete: RequestHandler = async (req, res): Promise<void> => {
    let id = req.user as number
    await apiKey.remove(id, req.body.apiKey)
    res.status(204).json({
        message: "API Key successfully removed.",
    })
}

export default {
    apiKeysGetAll,
    apiKeyCreate,
    apiKeyDelete,
}
