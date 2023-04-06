import { RequestHandler } from "express"
import { cookieReset } from "../utils/cookiereset"

export const checkAuthenticated: RequestHandler = (req, res, next) => {
    if (!req.isAuthenticated() && !req.user) {
        cookieReset(req, res)
        return res.redirect("/")
    }
    next()
}
