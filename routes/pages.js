const express = require('express');

const router = express.Router();

router.get(['/', '/index', '/home'], function(req, res) {
    res.status(200).render('pages/index.ejs');
});

router.get('/auth', function(req, res) {
    res.status(200).render('pages/auth.ejs');
});

router.get('/book', function(req, res) {
    res.status(200).render('pages/book_page.ejs');
});

router.get('/cart', function(req, res) {
    res.status(200).render('pages/cart.ejs');
});

router.get('/books', function(req, res) {
    res.status(200).render('pages/catalogue.ejs');
});

router.get('/profile', function(req, res) {
    res.status(200).render('pages/profile.ejs');
});

module.exports = router;