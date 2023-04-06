import { RequestHandler } from "express"
import errorHandling from "../../utils/errorHandling"
import { isErrorHandlingGeneral } from "../../types/ErrorHandlingGeneral.type"
import directorsModel from "../../models/api/directors.model"

// -------------------------------------------------------------------------------

const getDirectorById: RequestHandler = async (req, res): Promise<void> => {
    try {
        const directorId = req.params.directorId
        const results = await directorsModel.getDirectorById(directorId)
        res.status(200).json(results)
    } catch (err) {
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

const getDirectors: RequestHandler = async (req, res): Promise<void> => {
    try {
        const results = await directorsModel.getDirectors()
        res.status(200).json(results)
    } catch (err) {
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

export default {
    getDirectorById,
    getDirectors,
}
