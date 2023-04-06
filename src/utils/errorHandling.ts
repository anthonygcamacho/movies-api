import { Response } from "express"
import { ErrorHandlingGeneral } from "../types/ErrorHandlingGeneral.type"

// -------------------------------------------------------------------------------

const general = (err: ErrorHandlingGeneral, res: Response) => {
    const errorReport = {
        message: err.message,
        severity: err.severity,
        queryName: err.query.name,
        code: err.code,
        receive: err.receive,
    }
    let statusCode
    if (errorReport.severity === "ERROR") {
        statusCode = 400
    } else if (!errorReport.severity) {
        statusCode = 404
    }
    if (statusCode && typeof statusCode === "number") {
        res.status(statusCode).json({
            error: {
                code: statusCode,
                message: errorReport.message,
            },
        })
    }
    console.log(errorReport.receive)
    if (errorReport?.receive && errorReport.receive == 0) {
        res.status(404).json({
            error: {
                code: 404,
                message: errorReport.message,
            },
        })
    }
}

export default {
    general,
}
