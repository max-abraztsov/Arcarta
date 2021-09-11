import '../scss/zero.scss';
import '../css/style.css';
import '../scss/style.scss';
import '../img/logo.png';
import '../img/parthner1.png';
import '../img/parthner2.png';
import '../img/parthner3.png';
import '../img/parthner4.png';
import '../img/arrow.png';


window.addEventListener('DOMContentLoaded', () => {

    // Menu Burger
    const headerBurger = document.querySelector('.header__burger'),
          headerMenu = document.querySelector('.header__menu');

    headerBurger.addEventListener('click', (e) => {
        headerBurger.classList.toggle('active');
        headerMenu.classList.toggle('active');
        document.body.classList.toggle('lock');
    });


});