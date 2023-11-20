document.addEventListener('DOMContentLoaded', function() {
    const openMenuButton = document.getElementById('openMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    openMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
});