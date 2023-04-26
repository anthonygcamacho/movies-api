import { RequestHandler, Response } from "express"
import bcrypt = require("bcryptjs")
import userModel from "../models/users/user.model"
import { base64Encode } from "./base64encode"
import keysModel from "../models/api/keys.model"

const getAll = async (id: number, res: Response) => {
    let userFound = await userModel.findUserById(id)
    if (userFound.length > 0) {
        return await keysModel.getAllApiKeys(id)
    } else {
        return res.status(404).send({
            error: {
                code: 403,
                message: "Account not found. Unable to get API Keys.",
            },
        })
    }
}

const create = async (id: number, res: Response) => {
    let userFound = await userModel.findUserById(id)
    if (userFound.length > 0) {
        let strHashed = await bcrypt.hash(userFound[0].email, 5)
        let apiKeyEncoded = base64Encode(strHashed)
        let date = new Date()
        return await keysModel.insertApiKey(id, apiKeyEncoded, date)
    } else {
        return res.status(404).send({
            error: {
                code: 403,
                message: "Account not found. Unable to create API Key.",
            },
        })
    }
}

const remove = async (id: number, apiKey: string) => {
    return await keysModel.remoteApiKey(id, apiKey)
}

const validate: RequestHandler = async (req, res, next) => {
    if (!req.query.api_key) {
        res.status(403).send({
            error: { code: 403, message: "Access not allowed." },
        })
    } else {
        const apiKey = req.query.api_key.toString()
        let userFound = await userModel.findUserByApiKey(apiKey)
        if (userFound.length > 0) {
            next()
        } else {
            res.status(403).send({
                error: { code: 403, message: "Access not allowed." },
            })
        }
    }
}

export default { getAll, create, remove, validate }
