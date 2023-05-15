import { Router } from "express"
import { createCustomer, getCustomers } from "../controllers/customers.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { customerSchema } from "../schemas/customers.schema.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.post("/customers", validateSchema(customerSchema), createCustomer)


export default customersRouter