require("dotenv").config()
import jwt = require("jsonwebtoken")

export const createToken = (id: number, secret: string) => {
    return jwt.sign({ sub: id }, secret, { expiresIn: "1d" })
}
