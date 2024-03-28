window.onload = (event) => {
    const profileSection = document.getElementById('profile-section');
    const ordersSection = document.getElementById('orders-section');

    const profileButton = document.getElementById('profile-button');
    const ordersButton = document.getElementById('orders-button');

    openProfileSection();

    profileButton.onclick = openProfileSection;
    ordersButton.onclick = openOrdersSection;

    function openProfileSection() {
        profileButton.classList.add('section-active');
        ordersButton.classList.remove('section-active');

        ordersSection.classList.add('hidden');
        profileSection.classList.remove('hidden');
    }

    function openOrdersSection() {
        ordersButton.classList.add('section-active');
        profileButton.classList.remove('section-active');

        profileSection.classList.add('hidden');
        ordersSection.classList.remove('hidden');
    }
}