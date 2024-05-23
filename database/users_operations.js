const connection = require('./db_connection');

async function checkEmailExists(email) {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`SELECT * FROM users WHERE email = '${email}';`);

    conn.release();

    return result.length > 0;
}

async function registerUser(email, creds, password) {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`INSERT INTO users (user_id, name, email, password) 
                                     VALUES (NULL, '${creds}', '${email}', '${password}');`);
    
    conn.release();

    return {
        code: 200,
        user_id: result.insertId
    }
}

async function getUserById(id) {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`SELECT * FROM users WHERE user_id = ${id};`);

    conn.release();

    if (result.length === 0) {
        return {
            code: 404
        }
    }

    return {
        code: 200,
        user: result[0]
    };
}

async function getUserByEmail(email) {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`SELECT * FROM users WHERE email = '${email}';`);

    conn.release();

    if (result.length === 0) {
        return {
            code: 404
        }
    }

    return {
        code: 200,
        user: result[0]
    };
}

module.exports.checkEmailExists = checkEmailExists;
module.exports.registerUser = registerUser;
module.exports.getUserById = getUserById;
module.exports.getUserByEmail = getUserByEmail;