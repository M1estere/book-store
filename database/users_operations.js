const connection = require('./db_connection');

async function getUsers() {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`SELECT * FROM users;`);

    conn.release();

    return {
        code: 200,
        users: result
    };
}

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

async function editUserById(id, name, mail, password) {
    const conn = await connection.getConnection();
    try {
        await conn.query(`UPDATE users SET name = '${name}', email = '${mail}', password = '${password}' WHERE user_id = ${id};`);
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

async function deleteUser(id) {
    const conn = await connection.getConnection();
    try {
        await conn.query(`DELETE FROM users WHERE user_id = ${id};`);
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

module.exports.getUsers = getUsers;
module.exports.checkEmailExists = checkEmailExists;
module.exports.registerUser = registerUser;
module.exports.getUserById = getUserById;
module.exports.getUserByEmail = getUserByEmail;
module.exports.editUserById = editUserById;
module.exports.deleteUser = deleteUser;