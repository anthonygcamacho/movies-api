import * as express from "express"
import healthcheck from "./healthcheck"
import actors from "./actors"
import directors from "./directors"
import movies from "./movies"
// import swaggerUi from "swagger-ui-express"
// import { swaggerSpec } from "../../../utils/swagger"

// -------------------------------------------------------------------------------

const router = express.Router()

// Swagger page
// router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Swagger Docs in JSON format
// router.get("/docs.json", (req: Request, res: Response) => {
//     res.status(200).json(swaggerSpec)
// })

// Healthcheck
router.use("/healthcheck", healthcheck)

// Actors
router.use("/actors", actors)

// Direcotrs
router.use("/directors", directors)

// Movies
router.use("/movies", movies)

export default router
