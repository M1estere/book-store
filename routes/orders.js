const express = require('express');
const router = express.Router();

const { addOrder, getOrder } = require('../database/orders_operations');

router.post('/add', async function(req, res) {
    let userId = req.session.user.id;
    let ids = req.body.ids.toString().replaceAll(',', ' ').trim();
    let amount = req.body.amount;
    let cost = req.body.cost;
    let date = req.body.date;

    let add = await addOrder(userId, ids, amount, cost, date);
    let order = await getOrder(add.order_id);
    
    if (order.code != 200) {
        res.status(200).json({
            code: 400,
            message: 'Произошла ошибка'
        });
        return;
    }

    res.status(200).json({
        code: 200,
        order: order.order_id
    });
});

module.exports = router;