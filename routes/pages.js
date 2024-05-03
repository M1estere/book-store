const express = require('express');
const router = express.Router();

const { getBooks, getRandomBooks, getBook } = require('../database/books_operations.js');

router.get(['/', '/index', '/home'], async function(req, res) {
    let books = await getRandomBooks(5);
    
    res.status(200).render('pages/index.ejs', {
        recommended_books: books
    });
});

router.get('/auth', function(req, res) {
    res.status(200).render('pages/auth.ejs');
});

router.get('/book/:id', async function(req, res) {
    let id = req.params.id;

    let bookFunction = await getBook(id);
    let book = bookFunction.book;

    res.status(200).render('pages/book_page.ejs', {
        book: book
    });
});

router.get('/cart', function(req, res) {
    res.status(200).render('pages/cart.ejs');
});

router.get(['/books', '/catalogue', '/catalog'], async function(req, res) {
    let booksFunction = await getBooks();
    let books = booksFunction.books;
    let recommendedBooks = await getRandomBooks(4);

    res.status(200).render('pages/catalogue.ejs', {
        books: books,
        recommended_books: recommendedBooks
    });
});

router.get(['/about', '/info', '/aboutus'], function(req, res) {
    res.status(200).render('pages/about.ejs');
});

router.get('/profile', function(req, res) {
    res.status(200).render('pages/profile.ejs');
});

module.exports = router;