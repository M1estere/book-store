const express = require('express');
const router = express.Router();

const { getBooks } = require('../database/books_operations.js');
const { getReviews } = require('../database/reviews_operations.js');
const { getUsers } = require('../database/users_operations.js');
const { getOrders } = require('../database/orders_operations.js');

function checkAuthorize(req, res, next) {
    if (!req.session.user || req.session.user.id !== 4) {
        res.status(300).redirect('/auth');
        return;
    }

    next();
}

router.get(['/products', '/catalog', '/books', '/catalogue'], checkAuthorize, async function (req, res) {
    let books = await getBooks();

    res.status(200).render('pages/admin/products.ejs', { 
        books: books.books 
    });
});

router.get('/reviews', checkAuthorize, async function (req, res) {
    let reviews = await getReviews();

    res.status(200).render('pages/admin/reviews.ejs', {
        reviews: reviews.reviews
    });
});

router.get('/users', checkAuthorize, async function (req, res) {
    let users = await getUsers();

    res.status(200).render('pages/admin/users.ejs', {
        users: users.users
    });
});

router.get('/orders', checkAuthorize, async function (req, res) {
    let orders = await getOrders();

    res.status(200).render('pages/admin/orders.ejs', {
        orders: orders.orders
    });
});

module.exports = router;
