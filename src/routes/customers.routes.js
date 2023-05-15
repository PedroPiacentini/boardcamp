import { Router } from "express"
import { getCustomers } from "../controllers/customers.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { customerSchema } from "../schemas/customers.schema.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)

export default customersRouter