document.addEventListener('DOMContentLoaded', () => {

    const tabBtn = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');

    tabBtn.forEach((btn, i) => {
       btn.addEventListener('click', () => {
           changeActiveTab([tabBtn, tabContent], i)
       });
    });

    function changeActiveTab(arrays, i) {
        arrays.forEach(arr => {
            arr.forEach(item => {
                item.classList.remove('active');
            });
            arr[i].classList.add('active');
        });
    }

});



