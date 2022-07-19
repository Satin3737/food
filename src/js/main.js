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


});



