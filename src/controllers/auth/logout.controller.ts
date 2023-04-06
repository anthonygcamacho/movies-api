import { RequestHandler } from "express"
import { cookieReset } from "../../utils/cookiereset"

// -------------------------------------------------------------------------------

const logoutUser: RequestHandler = async (req, res): Promise<void> => {
    cookieReset(req, res)
    res.redirect("/")
}

export default {
    logoutUser,
}
