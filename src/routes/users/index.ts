import * as express from "express"
import usersController from "../../controllers/users/users.controller"

// -------------------------------------------------------------------------------

const router = express.Router()

// router.get('/:user_id')

router.post("/create", usersController.createUser)

router.delete("/:user_id", usersController.deleteUser)

export default router
