import { db } from "../database/database.connection.js"

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body

    const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId])
    if (customer.rows.length === 0) return res.sendStatus(404)

    const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId])
    if (game.rows.length === 0) return res.sendStatus(404)
    const rentDate = new Date().toISOString().split("T")[0]

    const originalPrice = daysRented * game.rows[0].pricePerDay


    if (game.rows.length == 0) return res.sendStatus(409)
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

export async function getRentals(req, res) {
    try {
        const games = await db.query(`
            SELECT *
            FROM rentals
            JOIN customers
                ON rentals."customerId" = customers.id
            JOIN games
                ON rentals."gameId" = games.id
        `)
        res.send(games.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function returnRental(req, res) {
    const { id } = req.params
    const date = new Date().toISOString().split("T")[0]

    const rental = await db.query(`
        SELECT * FROM rentals 
        WHERE id = $1;
    `, [id])

    if (rental.rows.length == 0) return res.sendStatus(404)
    if (rental.rows[0].returnDate) return res.sendStatus(400)

    try {
        await db.query(`
            UPDATE rentals
            SET "returnDate" = $1
            WHERE id = $2
        `, [date, id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRentals(req, res) {
    const { id } = req.params

    const rental = await db.query(`
        SELECT * FROM rentals 
        WHERE id = $1;
    `, [id])

    if (rental.rows.length == 0) return res.sendStatus(404)
    console.log(rental.rows[0].returnDate)
    if (rental.rows[0].returnDate == null) return res.sendStatus(400)

    try {
        await db.query(`
            DELETE FROM rentals
            WHERE id = $1
        `, [id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}