import '../scss/zero.scss';
import '../css/style.css';
import '../scss/style.scss';
import '../img/logo.png';


window.addEventListener('DOMContentLoaded', () => {
    const headerBurger = document.querySelector('.header__burger'),
          headerMenu = document.querySelector('.header__menu');

    headerBurger.addEventListener('click', (e) => {
        headerBurger.classList.toggle('active');
        headerMenu.classList.toggle('active');
    });
});