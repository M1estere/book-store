const express = require('express');
const router = express.Router();

const { getBooks, getRandomBooks, getBook, getAllGenres } = require('../database/books_operations.js');
const { getUserById } = require('../database/users_operations.js');
const { getUserOrders } = require('../database/orders_operations.js');

function checkAuthorize(req, res, next) {
    if (!req.session.user) {
        res.status(300).redirect('/auth');
        return;
    }

    next();
}

router.get(['/', '/index', '/home'], async function(req, res) {
    let books = await getRandomBooks(5);
    
    res.status(200).render('pages/index.ejs', {
        recommended_books: books
    });
});

router.get('/auth', function(req, res) {
    res.status(200).render('pages/auth.ejs');
});

router.get('/book/:id', checkAuthorize, async function(req, res) {
    let id = req.params.id;

    let bookFunction = await getBook(id);
    let book = bookFunction.book;

    res.status(200).render('pages/book_page.ejs', {
        book: book
    });
});

router.get('/cart', checkAuthorize, function(req, res) {
    res.status(200).render('pages/cart.ejs');
});

router.get(['/books', '/catalogue', '/catalog'], checkAuthorize, async function(req, res) {
    let booksFunction = await getBooks();
    let books = booksFunction.books;
    let recommendedBooks = await getRandomBooks(4);
    let genres = await getAllGenres();

    res.status(200).render('pages/catalogue.ejs', {
        books: books,
        recommended_books: recommendedBooks,
        genres: genres.genres
    });
});

router.get(['/about', '/info', '/aboutus'], function(req, res) {
    res.status(200).render('pages/about.ejs');
});

router.get('/profile', checkAuthorize, async function(req, res) {
    let user = await getUserById(req.session.user.id);
    let orders = await getUserOrders(req.session.user.id);

    res.status(200).render('pages/profile.ejs', {
        user: user.user,
        orders: orders.orders
    });
});

module.exports = router;