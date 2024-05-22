const express = require('express');
const router = express.Router();

const { getBooksById } = require('../database/books_operations.js');

router.post(['/cart', '/get_cart', '/get'], async function (req, res) {
    let ids = new Set(req.body.ids);
    let books = await getBooksById(ids);

    res.status(200).json({
        books: books.books
    });
});

module.exports = router;
