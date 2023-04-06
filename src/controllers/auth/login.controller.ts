import { RequestHandler } from "express"
import { createToken } from "../../utils/token"

// -------------------------------------------------------------------------------

const loginUser: RequestHandler = async (req, res): Promise<void> => {
    if (req.user === "FAILED") {
        res.status(404).json({
            error: { code: 404, message: "Incorrect email or password." },
        })
    } else {
        const token = createToken(
            req.user as number,
            process.env.PASSPORT_JWT_SECRET_OR_KEY_202303227 as string
        )
        res.status(200).json({ token })
    }
}

export default {
    loginUser,
}
