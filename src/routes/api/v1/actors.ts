import * as express from "express"
import actorsController from "../../../controllers/api/actors.controller"
import moviesController from "../../../controllers/api/movies.controller"

// -------------------------------------------------------------------------------

const router = express.Router()

/**
 * @swagger
 * /api/v1/actors:
 *   get:
 *     tags:
 *     - Actors
 *     summary: Get actors
 *     responses:
 *       200:
 *         description: A list of actors
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 */
router.get("/", actorsController.getActors)

/**
 * @swagger
 * '/api/v1/actors/{id}':
 *   get:
 *     tags:
 *     - Actors
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of an actor
 *     summary: Get a single actor
 *     responses:
 *       200:
 *         description: A single actor
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       400:
 *         $ref: '#/components/responses/400'
 *       401:
 *         $ref: '#/components/responses/401'
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.get("/:actorId", actorsController.getActorById)

/**
 * @swagger
 * '/api/v1/actors/{id}/movies':
 *   get:
 *     tags:
 *     - Actors
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of an actor
 *     summary: Get list of movies the actor starred in.
 *     responses:
 *       200:
 *         description: A list movies the actor starred in.
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
router.get("/:actorId/movies", moviesController.getMoviesByActorId)

export default router
