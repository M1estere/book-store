$('#login-action-button').on('click', async function login() {
    let fields = $('#login-form').find('input');

    let emailField = fields[0];
    let passwordField = fields[1];

    if (emailField.value.trim() === '' || passwordField.value.trim() === '') {
        $('#error-text').html('Заполните все поля!').css('visibility', 'visible');
        return;
    }
    let response = await fetch('/request/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailField.value,
            password: passwordField.value
        })
    });

    let result = await response.json();

    if (result.code !== 200) {
        console.log('This is bad');
        return;
    }

    window.location.replace('/home');
});

$('#register-action-button').on('click', async function register() {
    let fields = $('#registration-form').find('input');

    let emailField = fields[0];
    let credsField = fields[1];
    let passwordField = fields[2];

    if (emailField.value.trim() === '' || credsField.value.trim() === '' || passwordField.value.trim() === '') {
        $('#error-text').html('Заполните все поля!').css('visibility', 'visible');
        return;
    }

    let response = await fetch('/request/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailField.value,
            name: credsField.value,
            password: passwordField.value,
        }),
    });

    let result = await response.json();

    if (result.code !== 200) {
        console.log('This is bad');
        return;
    }

    window.location.replace('/home');
});