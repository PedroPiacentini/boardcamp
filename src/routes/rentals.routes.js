import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { createRental, deleteRentals, getRentals, returnRental } from "../controllers/rentals.controller.js"
import { rentalSchema } from "../schemas/rentals.schema.js"

const rentalsRouter = Router()

rentalsRouter.post("/rentals", validateSchema(rentalSchema), createRental)
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id/return", returnRental)
rentalsRouter.delete("/rentals/:id", deleteRentals)

export default rentalsRouter