import { Router } from "express"
import { getGames, createGame } from "../controllers/games.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { gameSchema } from "../schemas/games.schema.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", validateSchema(gameSchema), createGame)

export default gamesRouter