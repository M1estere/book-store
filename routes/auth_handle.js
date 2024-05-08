const { checkEmailExists, registerUser, getUserById, getUserByEmail } = require('../database/users_operations');

const express = require('express');
const router = express.Router();

router.post('/register', async function(req, res) {
    let email = req.body.email;
    let creds = req.body.name;
    let password = req.body.password;

    let emailExists = await checkEmailExists(email);

    if (emailExists) {
        console.log('User already exists');
        return;
    }

    let regUserResult = await registerUser(email, creds, password);

    let getUserResult = await getUserById(regUserResult.user_id);

    res.status(200).json({
        code: 200,
        user: {
            id: getUserResult.user.id,
            email: getUserResult.user.email
        }
    });
});

router.post('/login', async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let getUserResult = await getUserByEmail(email);

    if (getUserResult.user.password !== password) {
        res.status(200).json({
            code: 400, // TODO: Change Code
            message: 'Пароли не совпадают'
        });
        return;
    }

    res.status(200).json({
        code: 200,
        user: {
            id: getUserResult.user.id,
            email: getUserResult.user.email
        }
    });
});

module.exports = router;