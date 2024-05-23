const connection = require('./db_connection');

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

module.exports.getUserOrders = getUserOrders;