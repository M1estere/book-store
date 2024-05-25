const express = require('express');
const router = express.Router();

const { getBooks } = require('../database/books_operations.js');
const { getReviews } = require('../database/reviews_operations.js');
const { getUsers } = require('../database/users_operations.js');
const { getOrders } = require('../database/orders_operations.js');

router.get(['/products', '/catalog', '/books', '/catalogue'], async function (req, res) {
    let books = await getBooks();

    res.status(200).render('pages/admin/products.ejs', { 
        books: books.books 
    });
});

router.get('/reviews', async function (req, res) {
    let reviews = await getReviews();

    res.status(200).render('pages/admin/reviews.ejs', {
        reviews: reviews.reviews
    });
});

router.get('/users', async function (req, res) {
    let users = await getUsers();

    res.status(200).render('pages/admin/users.ejs', {
        users: users.users
    });
});

router.get('/orders', async function (req, res) {
    let orders = await getOrders();

    res.status(200).render('pages/admin/orders.ejs', {
        orders: orders.orders
    });
});

module.exports = router;
