import { Router } from "express"
import { getGames } from "../controllers/games.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { gameSchema } from "../schemas/games.schema.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)

export default gamesRouter