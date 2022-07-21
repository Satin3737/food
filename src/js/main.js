document.addEventListener('DOMContentLoaded', () => {

    // tabs variables
    const tabBtn = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');

    // tabs listeners
    tabBtn.forEach((btn, i) => {
       btn.addEventListener('click', () => {
           changeActiveTab([tabBtn, tabContent], i)
       });
    });

    // tabs function
    function changeActiveTab(arrays, i) {
        arrays.forEach(arr => {
            arr.forEach(item => {
                item.classList.remove('active');
            });
            arr[i].classList.add('active');
        });
    }


    // discount timer
    const deadline = '2022-10-27'; // when discount ends

    const date = new Date(deadline); // add expiring date to markup
    document.querySelector('[data-date="date"]').textContent = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    function getTimeRemaining(endOfTime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endOfTime) - new Date(); // difference in ms

        if (t <= 0) { // for expired timer
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)); // t / (1000ms * 60s * 60m * 24h)
            hours = Math.floor((t / (1000 * 60 * 60) % 24)); // (t / 1000ms * 60s * 60m) % 24h
            minutes = Math.floor((t / 1000 / 60) % 60); // (t / 1000ms / 60s) % 60m
            seconds = Math.floor((t / 1000) % 60); // (t / 1000ms) % 60s
        }

        return {total: t, days, hours, minutes, seconds}; // return variables in object
    }

    function setClock(selector, endOfTime) {
        const timer = document.querySelector(selector); // select timer and its parts
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        updateClock(); // update value in markup
        const timeInterval = setInterval(updateClock, 1000); // call updateClock() every second

        function updateClock() { // update variables with data from object that was returned
            const t = getTimeRemaining(endOfTime);
            // use addZero() to add zero when needed
            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) { // stop timer when deadline achieved
                clearInterval(timeInterval);
            }
        }
    }

    function addZero(num) { // add 0 before number if needed
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    // init timer
    setClock('.timer', deadline);


    // modal variables
    const pageBody = document.querySelector('body');
    const modal = document.querySelector('[data-modal="modal"]');
    const modalBtn = document.querySelectorAll('[data-modal="btn"]');
    const modalClose = document.querySelector('[data-modal="close"]');

    // timer for open modal
    const modalTimer = setTimeout(openModal, 10000);

    // modal listeners
    window.addEventListener('scroll', showModalByScroll);

    modalBtn.forEach(btn => {
       btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (e) => {
       if (e.target && e.target === modal || e.target === modalClose) {
           closeModal();
       }
    });

    pageBody.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal.classList.contains('opened')) {
            closeModal();
        }
    });

    // modal functions
    function openModal() {
        modal.classList.add('opened');
        pageBody.classList.add('fixed');
        clearInterval(modalTimer);
    }

    function closeModal() {
        modal.classList.remove('opened');
        pageBody.classList.remove('fixed');
    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    // create class for card
    class MenuCard {
        constructor(imageSrc, imageAlt, cardTitle, cardDesrc, price, parentSelector, ...classes) {
            this.imageSrc = imageSrc;
            this.imageAlt = imageAlt;
            this.cardTitle = cardTitle;
            this.cardDesrc = cardDesrc;
            this.price = price; // will be changed later
            this.transher = 36;
            this.changeToUAH(); // modify price with changeToUAH method
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes; // array
        }
        // create method for transfer USD to UAH
        changeToUAH() {
            this.price *= this.transher;
        }
        // create method for rendering card on page
        renderCard() {
            let card = document.createElement('div');

            // added all classes from rest operator or add default class
            if (!this.classes.includes('menu__item')) {
                card.classList.add('menu__item');
            }
            this.classes.forEach(className => card.classList.add(className));

            // added markup
            card.innerHTML = `
                <img src="${this.imageSrc}" alt="${this.imageAlt}">
                <h3 class="menu__item-subtitle">${this.cardTitle}</h3>
                <div class="menu__item-descr">${this.cardDesrc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</div>
                </div>
            `;

            // append new card
            this.parentSelector.append(card);
        }
    }

    // created cards using class MenuCard
    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        12,
        '.menu__field .container',
        'test-class1',
        'test-class2'
    ).renderCard();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню "Премиум"',
        'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        '.menu__field .container',
    ).renderCard();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        17,
        '.menu__field .container',
        'menu__item',
        'test-class1',
    ).renderCard();

});



