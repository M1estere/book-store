const { checkEmailExists, registerUser, getUserById, getUserByEmail } = require('../database/users_operations');

const express = require('express');
const router = express.Router();

router.post('/register', async function(req, res) {
    let email = req.body.email;
    let creds = req.body.name;
    let password = req.body.password;

    let emailExists = await checkEmailExists(email);

    if (emailExists) {
        res.status(200).json({
            code: 400,
            message: 'Пользователь существует'
        });
        return;
    }

    let regUserResult = await registerUser(email, creds, password);

    let getUserResult = await getUserById(regUserResult.user_id);

    if (getUserResult.code != 200) {
        res.status(200).json({
            code: 400,
            message: 'Произошла ошибка'
        });
        return;
    }

    res.status(200).json({
        code: 200,
        user: {
            id: getUserResult.user.user_id,
            email: getUserResult.user.email
        }
    });

    req.session.user = {
        id: getUserResult.user.user_id,
    };
});

router.post('/login', async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let getUserResult = await getUserByEmail(email);

    if (getUserResult.code == 404) {
        res.status(200).json({
            code: 400,
            message: 'Пользователя не существует'
        });
        return;
    }

    if (getUserResult.user.password !== password) {
        res.status(200).json({
            code: 400,
            message: 'Неверный пароль'
        });
        return;
    }

    req.session.user = {
        id: getUserResult.user.user_id,
    };
    
    res.status(200).json({
        code: getUserResult.user.user_id == 4 ? 201 : 200,
        user: {
            id: getUserResult.user.user_id,
            email: getUserResult.user.email
        }
    });
});

router.get('/logout', async function(req, res) {
    delete req.session.user;

    res.status(300).redirect('/auth');
});

module.exports = router;