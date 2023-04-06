import * as express from "express"
import * as passport from "passport"
import loginController from "../../controllers/auth/login.controller"
import logoutController from "../../controllers/auth/logout.controller"

// -------------------------------------------------------------------------------

const router = express.Router()

router.post(
    "/login",
    passport.authenticate("local", {
        session: true,
    }),
    loginController.loginUser
)

router.get("/logout", logoutController.logoutUser)

// router.post("/google", createController.createUser)

// router.post("/github", createController.createUser)

export default router
