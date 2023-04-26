import * as express from "express"
import directorsController from "../../../controllers/api/directors.controller"
import moviesController from "../../../controllers/api/movies.controller"

// -------------------------------------------------------------------------------

const router = express.Router()

/**
 * @swagger
 * /api/v1/directors:
 *   get:
 *     tags:
 *     - Directors
 *     summary: Get directors
 *     responses:
 *       200:
 *         description: A list of directors
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 */
router.get("/", directorsController.getDirectors)

/**
 * @swagger
 * '/api/v1/directors/{id}':
 *   get:
 *     tags:
 *     - Directors
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of a director
 *     summary: Get a single director
 *     responses:
 *       200:
 *         description: A single director
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.get("/:directorId", directorsController.getDirectorById)

/**
 * @swagger
 * '/api/v1/directors/{id}/movies':
 *   get:
 *     tags:
 *     - Directors
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of a director
 *     summary: Get list of movies by the director.
 *     responses:
 *       200:
 *         description: A list movies by the director.
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.get("/:directorId/movies", moviesController.getMoviesByDirectorId)

export default router
