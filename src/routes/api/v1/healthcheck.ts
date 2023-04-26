import * as express from "express"
import { healthCheckController } from "../../../controllers/api/healthcheck.controller"

// -------------------------------------------------------------------------------

const router = express.Router()

/**
 * @swagger
 * /api/v1/healthcheck:
 *   get:
 *     tags:
 *     - Healthcheck
 *     summary: Responds if the app is up and running
 *     description: Used for testing if the server up and running
 *     responses:
 *       200:
 *         description: App is up and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Will have a value of "UP" if everything is looking good.
 */
router.get("/", healthCheckController)

export default router
