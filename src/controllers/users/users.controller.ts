import { RequestHandler } from "express"
const Cookies = require("cookies")
import userModel from "../../models/users/user.model"
import errorHandling from "../../utils/errorHandling"
import { isErrorHandlingGeneral } from "../../types/ErrorHandlingGeneral.type"
import { cookieSettings } from "../../config/cookies"
import { base64Encode } from "../../utils/base64encode"
import { createToken } from "../../utils/token"

// -------------------------------------------------------------------------------

const createUser: RequestHandler = async (req, res): Promise<void> => {
    const { email, password } = req.body
    try {
        let userFound = await userModel.findUserByEmail(email)
        if (userFound.length == 0) {
            const results = await userModel.createUser(email, password)
            let objToEncode = JSON.stringify({
                passport: { user: results.user_id },
            })
            let resultsEncoded = base64Encode(objToEncode)
            let cookies = new Cookies(req, res, {
                keys: [
                    cookieSettings.COOKIE_KEY_1,
                    cookieSettings.COOKIE_KEY_2,
                ],
            })
            cookies.set(cookieSettings.name, resultsEncoded, {
                signed: cookieSettings.signed,
                maxAge: cookieSettings.maxAge,
                secure: cookieSettings.SECURE,
            })
            const token = createToken(
                results.user_id as number,
                process.env.PASSPORT_JWT_SECRET_OR_KEY_202303227 as string
            )
            console.log(token)
            res.status(201).json({ token })
        } else {
            res.status(409).json({
                error: { code: 409, message: "User already exists." },
            })
        }
    } catch (err) {
        console.log(err)
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

const deleteUser: RequestHandler = async (req, res): Promise<void> => {
    const userId = req.params.user_id
    try {
        const results = await userModel.deleteUserById(userId)
        console.log(results)
        res.status(200).json(results)
    } catch (err) {
        console.log(err)
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

export default {
    createUser,
    deleteUser,
}
