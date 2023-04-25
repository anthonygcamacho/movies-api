import * as express from "express"
import * as cors from "cors"
import { Request, Response, NextFunction } from "express"
import apiRoutes from "./api/v1"
import pageRoutes from "./pages"
import authRoutes from "./auth"
import usersRoutes from "./users"
import adminRoutes from "./admin"
import { ErrorWithStatus } from "../types/ErrorWithStatus"
import apikey from "../utils/apikey"
// import apikey from "../utils/apikey"

// -------------------------------------------------------------------------------

const router = express.Router()

router.use("/api/v1", cors({ origin: "*" }), apikey.validate, apiRoutes)
router.use("/auth", authRoutes)
router.use("/users", usersRoutes)
router.use("/admin", adminRoutes)
router.use("/", pageRoutes)

router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not found") as ErrorWithStatus
    error.status = 404
    next(error)
})

router.use(
    (
        error: ErrorWithStatus,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.status(error.status || 500).json({
            error: {
                message: error.message,
            },
        })
    }
)

export default router
