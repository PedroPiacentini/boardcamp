import { db } from "../database/database.connection.js"

function dateFormat(date) {
    return date.toISOString().split("T")[0]
}

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        customers.rows.map(customer => {
            customer.birthday = dateFormat(customer.birthday)
        })
        res.send(customers.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomersById(req, res) {
    const { id } = req.params
    try {
        const customers = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id])
        if (customers.rows.length === 0) return res.sendStatus(404)
        customers.rows.map(customer => {
            customer.birthday = dateFormat(customer.birthday)
        })
        res.send(customers.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function updateCustomer(req, res) {
    const { id } = req.params
    const { name, phone, cpf, birthday } = req.body
    try {
        const customer = await db.query(`
        SELECT * FROM customers WHERE cpf = $1
    `, [cpf])
        if (customer.rows[0].id != id && customer.rows.length !== 0) return res.sendStatus(409)
        await db.query(`
            UPDATE customers 
            SET name = $1, phone = $2, cpf = $3, birthday = $4
            WHERE id = $5;
        `, [name, phone, cpf, birthday, id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body
    console.log(birthday)
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