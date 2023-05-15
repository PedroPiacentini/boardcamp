import { db } from "../database/database.connection.js"

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        res.send(customers.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body

    const customer = await db.query(`
        SELECT * FROM customers WHERE cpf = $1
    `, [cpf])

    if (customer.rows.length !== 0) return res.sendStatus(409)
    try {
        await db.query(`
            INSERT INTO customers (name,phone,cpf,birthday)
            VALUES ($1, $2, $3, $4)
        `, [name, phone, cpf, birthday])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}