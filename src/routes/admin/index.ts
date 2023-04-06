import * as express from "express"
import * as passport from "passport"
import apikeyController from "../../controllers/admin/apikey.controller"

// -------------------------------------------------------------------------------

const router = express.Router()

router.get(
    "/apikey",
    passport.authenticate("jwt", {
        session: true,
    }),
    apikeyController.apiKeysGetAll
)

router.post(
    "/apikey",
    passport.authenticate("jwt", {
        session: true,
    }),
    apikeyController.apiKeyCreate
)

router.delete(
    "/apikey",
    passport.authenticate("jwt", {
        session: true,
    }),
    apikeyController.apiKeyDelete
)

export default router
