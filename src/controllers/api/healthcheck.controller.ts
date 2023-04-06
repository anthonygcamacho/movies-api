import { RequestHandler } from "express"

// -------------------------------------------------------------------------------

export const healthCheckController: RequestHandler = (req, res): void => {
    res.status(200).json({ status: "UP" })
}
