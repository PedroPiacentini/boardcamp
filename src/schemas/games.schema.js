import joi from "joi"

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string(),
    stockTotal: joi.number(),
    pricePerDay: joi.number()
})