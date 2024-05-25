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

async function getBooksById(ids) {
    const conn = await connection.getConnection();
    ids = [...ids];
    if (ids.length < 1) {
        conn.release();
        return {
            code: 200,
            books: []
        };
    }
    let [result] = await conn.query(`SELECT * FROM books WHERE book_id IN (${ids});`);

    conn.release();
    return {
        code: 200,
        books: result
    }
}

async function addBook(title, author, genres, description, imagePath, price) {
    const conn = await connection.getConnection();
    try {
        let [result] = await conn.query(`INSERT INTO books (title, author, description, genres_id, image_path, price) VALUES ('${title}', '${author}', '${genres}', '${description}', '${imagePath}', ${price});`);

        conn.release();
        return {
            code: 200,
            id: result.insertId
        };
    } catch (e) {
        console.log(e);
        conn.release();
        return {
            code: 500,
            id: -1
        };
    }
}

async function deleteBook(id) {
    const conn = await connection.getConnection();
    try {
        await conn.query(`DELETE FROM books WHERE book_id = ${id};`);
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

async function editBookById(id, title, author, genres, description, imagePath, price) {
    const conn = await connection.getConnection();
    try {
        await conn.query(`UPDATE books SET image_path = "${imagePath}", title = "${title}", author = "${author}", description = '${description}', genres_id = "${genres}", price = ${price}  WHERE book_id = ${id};`);
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

async function getAllGenres() {
    const conn = await connection.getConnection();

    let [result] = await conn.query('SELECT * FROM genres;');
    result.forEach(function (genre) {genre.title = capitalizeFirstLetter(genre.title);});

    conn.release();
    return {
        code: 200,
        genres: result
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.getBooks = getBooks;
module.exports.getBooksById = getBooksById;
module.exports.getRandomBooks = getRandomBooks;
module.exports.getBook = getBook;
module.exports.getAllGenres = getAllGenres;
module.exports.editBookById = editBookById;
module.exports.addBook = addBook;
module.exports.deleteBook = deleteBook;