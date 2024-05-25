const express = require('express');
const router = express.Router();

const { getBooksById, editBookById, addBook, deleteBook } = require('../database/books_operations.js');

router.post(['/cart', '/get_cart', '/get'], async function (req, res) {
    let ids = new Set(req.body.ids);
    let books = await getBooksById(ids);

    res.status(200).json({
        books: books.books
    });
});

router.post('/edit', async function (req, res) {
    let id = req.body.id;
    let title = req.body.title;
    let author = req.body.author;
    let genres = req.body.genres;
    let description = req.body.description;
    let imagePath = req.body.image_path;
    let price = req.body.price;

    let result = await editBookById(id, title, author, genres, description, imagePath, price);

    res.status(200).json({
        code: 200,
        message: result.code == 200 ? `Книга ${id} (${title}) успешно изменена` : 'Произошла ошибка при изменении'
    });
});

router.put('/add', async function (req, res) {
    let title = req.body.title;
    let author = req.body.author;
    let genres = req.body.genres;
    let description = req.body.description;
    let imagePath = req.body.image_path;
    let price = req.body.price;

    let result = await addBook(title, author, genres, description, imagePath, price);

    res.status(200).json({
        code: 200,
        id: result.id,
        message: result.code == 200 ? `Книга (${title}) добавлена успешно` : 'Произошла ошибка при добавлении'
    });
});

router.delete('/delete', async function (req, res) {
    let id = req.body.id;

    let result = await deleteBook(id);

    res.status(200).json({
        code: 200,
        message: result.code == 200 ? `Книга ${id} успешно удалена` : 'Произошла ошибка при удалении'
    });
});

module.exports = router;
