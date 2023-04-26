import { Request, Response } from "express"
import constants from "../../config/constants"
import { cookieReset } from "../../utils/cookiereset"

const { ENV, API_DOCS_PATH } = constants

// -------------------------------------------------------------------------------

export const accountController = (req: Request, res: Response): void => {
    // res.set("Cache-Control", "public, max-age=300, s-maxage=600")

    if (req.user === "FAILED") {
        cookieReset(req, res)
        res.status(401).redirect("/")
    } else {
        res.render("account", {
            page: "account",
            isAuthenticated: req.isAuthenticated(),
            ENV,
            API_DOCS_PATH,
        })
    }
}
