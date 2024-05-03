const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    database: 'book-store',
    user: 'root',
    password: '',
}).promise();

pool.getConnection(function(err, conn) {
    console.log('Connection success');
});

pool.on('error', function(err) {
    console.log(err.code);
});

module.exports = {
    getConnection: function() {
        return pool.getConnection();
    }
};