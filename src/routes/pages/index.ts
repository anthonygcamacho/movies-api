import * as express from "express"
import { homeController } from "../../controllers/pages/home.controller"
import { accountController } from "../../controllers/pages/account.controller"
import { checkAuthenticated } from "../../middleware/checkAuthenticated"
import { checkNotAuthenticated } from "../../middleware/checkNotAthenticated"

// -------------------------------------------------------------------------------

const router = express.Router()

router.get("/", checkNotAuthenticated, homeController)

router.get("/account", checkAuthenticated, accountController)

// router.get('*', notFoundPage)

export default router
