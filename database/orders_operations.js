const connection = require('./db_connection');

async function getOrders() {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`SELECT * FROM orders;`);

    conn.release();
    return {
        code: 200,
        orders: result
    }
}

async function getUserOrders(id) {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`SELECT * FROM orders WHERE user_id = ${id};`);

    for (order of result) {
        let ids = order.products.split(' ').map((item) => parseInt(item, 10));

        if (ids.length < 1) {
            order.books = [];
            continue;
        }

        let [books] = await conn.query(`SELECT * FROM books WHERE book_id IN (${ids});`);
        order.books = books;
    }

    conn.release();
    return {
        code: 200,
        orders: result
    }
}

async function addOrder(userId, products, amount, cost, date) {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`INSERT INTO orders (order_id, user_id, products, amount, cost, order_date) 
                                     VALUES (NULL, ${userId}, '${products}', ${amount}, ${cost}, '${date}');`);

    conn.release();
    return {
        code: 200,
        order_id: result.insertId
    };
}

async function getOrder(id) {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`SELECT * FROM orders WHERE order_id = ${id};`);

    conn.release();

    if (result.length == 0) {
        return {
            code: 400
        };
    }

    return {
        code: 200,
        review: result[0]
    }
}

async function deleteOrder(id) {
    const conn = await connection.getConnection();
    try {
        await conn.query(`DELETE FROM orders WHERE order_id = ${id};`);
    } catch (e) {
        console.log(e);
        conn.release();
        return {
            code: 500
        };
    }

    conn.release();
    return {
        code: 200
    }
}

module.exports.getOrders = getOrders;
module.exports.getUserOrders = getUserOrders;
module.exports.addOrder = addOrder;
module.exports.getOrder = getOrder;
module.exports.deleteOrder = deleteOrder;