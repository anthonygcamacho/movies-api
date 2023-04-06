import { RequestHandler } from "express"
import constants from "../../config/constants"

const {
    ENV,
    API_URL,
    LOGIN_PATH,
    LOGIN_REDIRECT_PATH,
    CREATE_USER_PATH,
    CREATE_USER_REDIRECT_PATH,
    RESET_PASSWORD_PATH,
    CREATE_NEW_PASSWORD_PATH,
} = constants

// -------------------------------------------------------------------------------

export const homeController: RequestHandler = (req, res): void => {
    // res.set("Cache-Control", "public, max-age=300, s-maxage=600")

    res.render("home", {
        page: "home",
        // isAuthenticated: req.isAuthenticated(),
        isAuthenticated: false,
        ENV,
        API_URL,
        LOGIN_PATH,
        LOGIN_REDIRECT_PATH,
        CREATE_USER_PATH,
        CREATE_USER_REDIRECT_PATH,
        RESET_PASSWORD_PATH,
        CREATE_NEW_PASSWORD_PATH,
    })
}
