/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', () => {
  // tabs variables
  const tabBtn = document.querySelectorAll('.tabheader__item');
  const tabContent = document.querySelectorAll('.tabcontent'); // tabs listeners

  tabBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      changeActiveTab([tabBtn, tabContent], i);
    });
  }); // tabs function

  function changeActiveTab(arrays, i) {
    arrays.forEach(arr => {
      arr.forEach(item => {
        item.classList.remove('active');
      });
      arr[i].classList.add('active');
    });
  } // discount timer


  const deadline = '2022-10-27'; // when discount ends

  const date = new Date(deadline); // add expiring date to markup

  document.querySelector('[data-date="date"]').textContent = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

  function getTimeRemaining(endOfTime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endOfTime) - new Date(); // difference in ms

    if (t <= 0) {
      // for expired timer
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)); // t / (1000ms * 60s * 60m * 24h)

      hours = Math.floor(t / (1000 * 60 * 60) % 24); // (t / 1000ms * 60s * 60m) % 24h

      minutes = Math.floor(t / 1000 / 60 % 60); // (t / 1000ms / 60s) % 60m

      seconds = Math.floor(t / 1000 % 60); // (t / 1000ms) % 60s
    }

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    }; // return variables in object
  }

  function setClock(selector, endOfTime) {
    const timer = document.querySelector(selector); // select timer and its parts

    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    updateClock(); // update value in markup

    const timeInterval = setInterval(updateClock, 1000); // call updateClock() every second

    function updateClock() {
      // update variables with data from object that was returned
      const t = getTimeRemaining(endOfTime); // use addZero() to add zero when needed

      days.textContent = addZero(t.days);
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        // stop timer when deadline achieved
        clearInterval(timeInterval);
      }
    }
  }

  function addZero(num) {
    // add 0 before number if needed
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  } // init timer


  setClock('.timer', deadline); // modal variables

  const pageBody = document.querySelector('body');
  const modal = document.querySelector('[data-modal="modal"]');
  const modalBtn = document.querySelectorAll('[data-modal="btn"]');
  const modalClose = document.querySelector('[data-modal="close"]'); // timer for open modal

  const modalTimer = setTimeout(openModal, 10000); // modal listeners

  window.addEventListener('scroll', showModalByScroll);
  modalBtn.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  modal.addEventListener('click', e => {
    if (e.target && e.target === modal || e.target === modalClose) {
      closeModal();
    }
  });
  pageBody.addEventListener('keydown', e => {
    if (e.key === "Escape" && modal.classList.contains('opened')) {
      closeModal();
    }
  }); // modal functions

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
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map