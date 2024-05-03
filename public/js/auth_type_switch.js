window.onload = () => {
    const loginForm = document.getElementById('login-form');
    const registrationForm = document.getElementById('registration-form');

    const loginButton = document.getElementById('login-button');
    const registrationButton = document.getElementById('registration-button');

    activateLoginForm();

    loginButton.onclick = activateLoginForm;
    registrationButton.onclick = activateRegistrationForm;

    function activateLoginForm() {
        loginButton.classList.add('form-active');
        registrationButton.classList.remove('form-active');

        loginForm.classList.remove('hidden');
        registrationForm.classList.add('hidden');
    }

    function activateRegistrationForm() {
        loginButton.classList.remove('form-active');
        registrationButton.classList.add('form-active');

        loginForm.classList.add('hidden');
        registrationForm.classList.remove('hidden');
    }
}