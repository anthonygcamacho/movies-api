import * as express from "express"
import moviesController from "../../../controllers/api/movies.controller"
import actorsController from "../../../controllers/api/actors.controller"

// -------------------------------------------------------------------------------

const router = express.Router()

/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     tags:
 *     - Movies
 *     summary: Get movies
 *     responses:
 *       200:
 *         description: A list of movies
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 */
router.get("/", moviesController.getMovies)

/**
 * @swagger
 * '/api/v1/movies/{id}':
 *   get:
 *     tags:
 *     - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of a movie
 *     summary: Get a single movie
 *     responses:
 *       200:
 *         description: A single movie
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.get("/:movieId", moviesController.getMovieById)

/**
 * @swagger
 * '/api/v1/movies/{id}/actors':
 *   get:
 *     tags:
 *     - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of a movie
 *     summary: Get list of a movie's actors.
 *     responses:
 *       200:
 *         description: A list of a movie's actors.
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.get("/:movieId/actors", actorsController.getActorsByMovieId)

/**
 * @swagger
 * '/api/v1/movies/{id}/revenue':
 *   get:
 *     tags:
 *     - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of a movie
 *     summary: Get a movie's revenue.
 *     responses:
 *       200:
 *         description: A movie's revenue.
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.get("/:movieId/revenue", moviesController.getRevenueByMovieId)

export default router
