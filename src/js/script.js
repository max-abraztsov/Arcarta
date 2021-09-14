import '../scss/zero.scss';
import '../css/style.css';
import '../scss/style.scss';
import '../img/logo.png';
import '../img/parthner1.png';
import '../img/parthner2.png';
import '../img/parthner3.png';
import '../img/parthner4.png';
import '../img/arrow.png';
import '../img/illustration-big.png';
import '../img/ill-1.png';
import '../img/ill-2.png';
import '../img/ill-3.png';
import '../img/ill-4.png';
import '../img/laptop.png';
import '../img/vector-arrow.png';


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