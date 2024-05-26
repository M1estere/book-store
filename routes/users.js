const express = require('express');
const router = express.Router();

const { getUserById, editUserById, deleteUser } = require('../database/users_operations.js');

router.post('/edit', async function (req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let mail = req.body.mail;
    let password = req.body.password;

    let result = await editUserById(id, name, mail, password);

    res.status(200).json({
        code: 200,
        message: result.code == 200 ? `Пользователь ${id} (${name}) успешно изменена` : 'Произошла ошибка при изменении'
    });
});

router.delete('/delete', async function (req, res) {
    let id = req.body.id;

    let result = await deleteUser(id);

    res.status(200).json({
        code: 200,
        message: result.code == 200 ? `Пользователь ${id} успешно удален` : 'Произошла ошибка при удалении'
    });
});

module.exports = router;
