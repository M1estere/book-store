window.addEventListener('load', () => {
    $('#login-action-button').removeClass('brown-button');
    $('#register-action-button').removeClass('brown-button');

    $('#login-form').find('input').on('change', function (e) {
        let fields = $(this).parents('#login-form').find('input');

        for (let field of fields) {
            console.log($(field).val());
            if ($(field).val().trim().length < 1) {
                $('#login-action-button').on('click', () => {});
                return;
            }
        }

        $('#login-action-button').removeClass('bg-gray-500');
        $('#login-action-button').addClass('bg-[var(--main-dark-brown)]');
        $('#login-action-button').addClass('brown-button');

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
        
            if (result.code !== 200 && result.code !== 201) {
                $('#error-text').html(result.message).css('visibility', 'visible');
                return;
            }
        
            window.location.replace(result.code == 200 ? '/home' : '/admin/products');
        });
    });

    $('#registration-form').find('input').on('change', function (e) {
        let fields = $(this).parents('#registration-form').find('input');

        for (let field of fields) {
            if ($(field).val().trim().length < 1) {
                $('#register-action-button').on('click', () => {});
                return;
            }
        }

        $('#register-action-button').removeClass('bg-gray-500');
        $('#register-action-button').addClass('bg-[var(--main-dark-brown)]');
        $('#register-action-button').addClass('brown-button');

        $('#register-action-button').on('click', async function register() {
            let fields = $('#registration-form').find('input');
        
            let emailField = fields[0];
            let credsField = fields[1];
            let passwordField = fields[2];
        
            if (emailField.value.trim() === '' || credsField.value.trim() === '' || passwordField.value.trim() === '') {
                $('#error-text').html('Заполните все поля!').css('visibility', 'visible');
                return;
            }
            if (passwordField.value.trim().length < 4) {
                $('#error-text').html('Слабый пароль').css('visibility', 'visible');
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
                $('#error-text').html(result.message).css('visibility', 'visible');
                return;
            }
        
            window.location.replace('/home');
        });
    });

});