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
import '../img/little-illustration.png';
import '../img/partnership.png';
import '../img/approve.jpg';
import '../img/people.png';
import '../img/social1.png';
import '../img/social2.png';
import '../img/social3.png';
import '../img/arr-1.png';


window.addEventListener('DOMContentLoaded', () => {

    // Menu Burger
    const headerBurger = document.querySelector('.header__burger'),
          headerMenu = document.querySelector('.header__menu');

    headerBurger.addEventListener('click', () => {
        headerBurger.classList.toggle('active');
        headerMenu.classList.toggle('active');
        document.body.classList.toggle('lock');
    });

    // Footer navigation
    if (document.body.offsetWidth <= 768){
        const itemsCol = document.querySelectorAll('.footer__col');

        itemsCol.forEach( (item) => {
            item.addEventListener('click', () => {
                if(item.classList.contains('footer__active')){
                    clearClasses();
                } else {
                    clearClasses();
                    item.classList.add('footer__active');
                }
            });
        });

        function clearClasses(){
            itemsCol.forEach( item => {
                item.classList.remove('footer__active');
            });
        }
    }

    //Card swap
    if (document.body.offsetWidth > 768){
        const cardsParent = document.querySelector('.quiz__cards'),
              cards = document.querySelectorAll('.quiz__card');

        cardsParent.addEventListener('mouseover', event => {
            if (event.target.classList.contains('quiz__card')){
                cards[0].style.cssText = `
                    transform:rotate(15deg);
                    transition: all .3s ease 0s;
                    left:160px;
                    top:40px;
                `;
                cards[1].addEventListener('click', () => {
                    cards[0].style.zIndex = '1';
                    cards[1].style.zIndex = '3';
                });
                cards[0].addEventListener('click', () => {
                    cards[1].style.zIndex = '1';
                    cards[0].style.zIndex = '3';

                });
            }
        });
        cardsParent.addEventListener('mouseleave', () => {
            cards[0].style.cssText = `
                transform:rotate(0deg);
            `;
        });
    }

    //Form 
    const form = document.querySelector('.reg__form'),
          email = form.querySelector('input');

    async function workWithData(url, method, headers, body){
        const data = await fetch(url, {
            method: method,
            headers: headers,
            body:JSON.stringify(body)
        });
        return await data.json();
    }

    postData(form);

    function postData(form){
        form.addEventListener('submit', event => {
            event.preventDefault();
            const emailData = {
                email: email.value
            };

            workWithData('https://jsonplaceholder.typicode.com/users',
            'POST',
            {'Content-Type':'application/json'},
            emailData)
            .then(data => {
                console.log(data);
            }).catch(() => {
                console.error('Error');
            }).finally(() => {
                form.reset();
            })
        });
    }

    // Animation
    const animItems = document.querySelectorAll('._anim-item');

    if (animItems.length > 0){
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll(params = 0){
            for (let i = 0; i < animItems.length; i++){
                const animItem = animItems[i];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;

                if (animItemHeight > window.innerHeight){
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                    animItem.classList.add('_active');
                }else{
                    animItem.classList.remove('_active');
                }

            }
        }
    }
    function offset(elem){
        const rect = elem.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left:rect.left + scrollLeft }
    }

});