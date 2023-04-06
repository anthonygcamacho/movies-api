const Cookies = require("cookies")
import { Request, Response } from "express"
import { cookieSettings } from "../config/cookies"

export const cookieReset = (req: Request, res: Response) => {
    let cookies = new Cookies(req, res, {
        keys: [cookieSettings.COOKIE_KEY_1, cookieSettings.COOKIE_KEY_2],
    })
    cookies.set(cookieSettings.name, "e30=", {
        signed: cookieSettings.signed,
        maxAge: cookieSettings.maxAge,
        secure: cookieSettings.SECURE,
    })
}
