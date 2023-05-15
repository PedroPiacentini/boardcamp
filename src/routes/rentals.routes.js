import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { createRental } from "../controllers/rentals.controller.js"
import { rentalSchema } from "../schemas/rentals.schema.js"

const rentalsRouter = Router()

rentalsRouter.post("/rentals", validateSchema(rentalSchema), createRental)

export default rentalsRouter