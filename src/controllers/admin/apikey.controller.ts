import { RequestHandler } from "express"
import apiKey from "../../utils/apikey"

// -------------------------------------------------------------------------------

const apiKeysGetAll: RequestHandler = async (req, res): Promise<void> => {
    let id = req.user as number
    const results = await apiKey.getAll(id, res)
    res.status(200).json(results)
}

const apiKeyCreate: RequestHandler = async (req, res): Promise<void> => {
    let id = req.user as number
    const results = await apiKey.create(id, res)
    res.status(201).json({
        apiKey: results[0].api_key,
        apiKeyCreate: results[0].api_key_created,
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
