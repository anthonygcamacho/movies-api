import { RequestHandler } from "express"
import errorHandling from "../../utils/errorHandling"
import { isErrorHandlingGeneral } from "../../types/ErrorHandlingGeneral.type"
import moviesModel from "../../models/api/movies.model"

// -------------------------------------------------------------------------------

const getMovieById: RequestHandler = async (req, res): Promise<void> => {
    try {
        const movieId = req.params.movieId
        const results = await moviesModel.getMovieById(movieId)
        res.status(200).json(results)
    } catch (err) {
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

const getMovies: RequestHandler = async (req, res): Promise<void> => {
    try {
        const results = await moviesModel.getMovies()
        res.status(200).json(results)
    } catch (err) {
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

const getMoviesByActorId: RequestHandler = async (req, res): Promise<void> => {
    try {
        const actorId = req.params.actorId
        const results = await moviesModel.getMoviesByActorId(actorId)
        res.status(200).json(results)
    } catch (err) {
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

const getMoviesByDirectorId: RequestHandler = async (
    req,
    res
): Promise<void> => {
    try {
        const directorId = req.params.directorId
        const results = await moviesModel.getMoviesByDirectorId(directorId)
        res.status(200).json(results)
    } catch (err) {
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

const getRevenueByMovieId: RequestHandler = async (req, res): Promise<void> => {
    try {
        const movieId = req.params.movieId
        const results = await moviesModel.getRevenueByMovieId(movieId)
        res.status(200).json(results)
    } catch (err) {
        if (isErrorHandlingGeneral(err)) {
            errorHandling.general(err, res)
        }
    }
}

export default {
    getRevenueByMovieId,
    getMoviesByDirectorId,
    getMoviesByActorId,
    getMovieById,
    getMovies,
}
