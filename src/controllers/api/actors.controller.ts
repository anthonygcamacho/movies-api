import { RequestHandler } from "express"
import errorHandling from "../../utils/errorHandling"
import { isErrorHandlingGeneral } from "../../types/ErrorHandlingGeneral.type"
import actorsModel from "../../models/api/actors.model"

// -------------------------------------------------------------------------------

const getActors: RequestHandler = async (req, res): Promise<void> => {
    try {
        const results = await actorsModel.getActors()
        res.status(200).json(results)
    } catch (err) {
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

const getActorById: RequestHandler = async (req, res): Promise<void> => {
    try {
        const actorId = req.params.actorId
        const results = await actorsModel.getActorById(actorId)
        res.status(200).json(results)
    } catch (err) {
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

const getActorsByMovieId: RequestHandler = async (req, res): Promise<void> => {
    try {
        const moviesId = req.params.movieId
        const results = await actorsModel.getActorsByMovieId(moviesId)
        res.status(200).json(results)
    } catch (err) {
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

export default {
    getActorsByMovieId,
    getActorById,
    getActors,
}
