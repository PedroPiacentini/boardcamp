import { db } from "../database/database.connection.js"

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body

    const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId])
    if (customer.rows.length === 0) return res.sendStatus(404)

    const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId])
    if (game.rows.length === 0) return res.sendStatus(404)
    const rentDate = new Date().toISOString().split("T")[0]

    const originalPrice = daysRented * gameId.rows[0].pricePerDay


    if (game.rows.length !== 0) return res.sendStatus(409)
    try {
        await db.query(`
            INSERT INTO rentals ("customerId","gameId","rentDate","daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, rentDate, daysRented, null, originalPrice, null])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}