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
    let offset: number | undefined
    let limit: number | undefined
    if (req.query?.offset) {
        offset = Number(req.query.offset)
    }
    if (req.query?.limit) {
        limit = Number(req.query.limit)
    }
    try {
        const results = await directorsModel.getDirectors(offset, limit)
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
