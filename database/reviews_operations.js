const connection = require('./db_connection');

async function getReviews() {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`SELECT * FROM reviews;`);
    
    conn.release();
    return {
        code: 200,
        reviews: result
    };
}

async function addReview(name, phone, comment) {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`INSERT INTO reviews (review_id, name, phone, comment) 
                                     VALUES (NULL, '${name}', '${phone}', '${comment}');`);
    
    conn.release();
    return {
        code: 200,
        review_id: result.insertId
    };
}

async function getReview(id) {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`SELECT * FROM reviews WHERE review_id = ${id};`);

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

async function deleteReview(id) {
    const conn = await connection.getConnection();
    try {
        await conn.query(`DELETE FROM reviews WHERE review_id = ${id};`);
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

module.exports.getReviews = getReviews;
module.exports.addReview = addReview;
module.exports.getReview = getReview;
module.exports.deleteReview = deleteReview;