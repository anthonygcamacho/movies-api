import { Request, Response } from "express"
import constants from "../../config/constants"

const { ENV } = constants

// -------------------------------------------------------------------------------

export const accountController = (req: Request, res: Response): void => {
    // res.set("Cache-Control", "public, max-age=300, s-maxage=600")

    res.render("account", {
        page: "account",
        isAuthenticated: req.isAuthenticated(),
        ENV,
    })
}
