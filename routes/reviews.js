const express = require('express');
const router = express.Router();

const { addReview, getReview, deleteReview } = require('../database/reviews_operations');

router.post('/add', async function(req, res) {
    let name = req.body.name;
    let phone = req.body.phone;
    let comment = req.body.comment;

    let add = await addReview(name, phone, comment);
    let review = await getReview(add.review_id);

    if (review.code != 200) {
        res.status(200).json({
            code: 400,
            message: 'Произошла ошибка'
        });
        return;
    }

    res.status(200).json({
        code: 200,
        review: review.review_id
    });
});

router.delete('/delete', async function(req, res) {
    let id = req.body.id;

    let result = await deleteReview(id);

    res.status(200).json({
        code: 200,
        message: result.code == 200 ? `Отзыв ${id} успешно удален` : 'Произошла ошибка при удалении'
    });
});

module.exports = router;