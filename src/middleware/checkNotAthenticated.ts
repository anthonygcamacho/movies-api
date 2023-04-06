import { RequestHandler } from "express"
import { cookieReset } from "../utils/cookiereset"

export const checkNotAuthenticated: RequestHandler = (req, res, next) => {
    if (!req.isAuthenticated() && !req.user) {
        cookieReset(req, res)
    }
    next()
}
