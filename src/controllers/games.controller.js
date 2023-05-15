import { db } from "../database/database.connection.js"

export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games;`)
        console.table(receitas.rows)
        res.send(receitas.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}