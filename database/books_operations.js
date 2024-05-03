const connection = require('./db_connection');

async function getBooks() {
    const conn = await connection.getConnection();
    let [result] = await conn.query('SELECT * FROM books;');

    conn.release();
    return {
        code: 200,
        books: result
    }
}

async function getRandomBooks(amount) {
    let booksFunction = await getBooks();
    let books = booksFunction.books;

    const shuffled = books.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, amount);
}

async function getBook(id) {
    const conn = await connection.getConnection();
    let [result] = await conn.query(`SELECT * FROM books WHERE book_id = ${id};`);

    let genres = result[0].genres_id;
    result[0].genres_id = await getGenres(genres);
    
    conn.release();
    return {
        code: 200,
        book: result[0]
    }
}

async function getGenres(genres_ids) {
    const conn = await connection.getConnection();

    let genres = genres_ids.split(' ');
    let [result] = await conn.query(`SELECT title FROM genres WHERE genre_id IN (${genres});`);
    
    conn.release();
    return result;
}

module.exports.getBooks = getBooks;
module.exports.getRandomBooks = getRandomBooks;
module.exports.getBook = getBook;