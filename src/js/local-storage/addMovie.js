// Встановлення throttle

import throttle from 'lodash.throttle';

// Константи
<<<<<<< Updated upstream
const KEY_QUEUE = 'queue';
const KEY_WATCHED = 'watched';
let queueList = [];
let watchedList = [];

// Шлях до кнопок
const addToQueueBtn = document.querySelector("[data-addToQueue]");
const addToWatchedBtn = document.querySelector("[data-addToWatched]");
=======
const STORAGE_KEY_QUEUE = 'storage-queue';
const STORAGE_KEY_WATCHED = 'storage-watched';
const queueData = {};
const watchedData = {};
queueListData();
viewListData();

// Шлях до кнопок
const addToQueueBtn = document.querySelector(".addToQueueBtn");
const addToWatchedBtn = document.querySelector(".addToWatchedBtn");
const queueBtn = document.querySelector(".queueBtn");
const watchedBtn = document.querySelector(".watchedBtn");
>>>>>>> Stashed changes

// Слухачі подій
addToQueueBtn.addEventListener('click', throttle(onQueueBtn, 500));
addToWatchedBtn.addEventListener('click', throttle(onWatchedBtn, 500));

// Функція для роботи зі сховищем
// Функція додавання фільмів до черги
<<<<<<< Updated upstream
function onQueueBtn () {
    let id = addToQueueBtn.dataset.action;
    console.log(id);
    if (queueList === []) {
        queueList = id;
    }
    if (queueList.includes(id)) {
        return;
    } else {
        queueList.push(id);
    }
    // const saveQueueFilms = localStorage.getItem(KEY_QUEUE);
    // const parseQueueFilms = JSON.parse(saveQueueFilms);
    // console.log(parseQueueFilms);
    localStorage.setItem(KEY_QUEUE, JSON.stringify(queueList));
}
// Функція додавання переглянутих фільмів
function onWatchedBtn () {
    let id = addToWatchedBtn.dataset.action;
    console.log(id);
    if (watchedList.includes(id)) {
        return;
    }
    if (queueList.includes(id)) {
        const indexId = queueList.indexOf(id);
        console.log(indexId);
        queueList = queueList.splice(indexId, 1);
        const saveQueueFilms = localStorage.getItem(KEY_QUEUE);
        const parseQueueFilms = JSON.parse(saveQueueFilms);
        const indexIdStorage = parseQueueFilms.indexOf(id);
        localStorage.setItem(KEY_QUEUE, JSON.stringify(indexIdStorage.splice(indexId, 1)));
        console.log(parseQueueFilms);
        console.log(queueList);
    }
    if (watchedList === []) {
        watchedList = id;
    } else { 
        watchedList.push(id);
    }
    localStorage.setItem(KEY_WATCHED, JSON.stringify(watchedList));
}

=======
function onQueueBtn (e) {
    // modalData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(queueData));
}
// Функція читання фільмів в черзі
function queueListData() {
    const form = document.querySelector(".feedback-form");
    const saveMessage = localStorage.getItem(STORAGE_KEY);
    const formData = JSON.parse(saveMessage);
    try {
        if(formData.email) {   
            form.email.value = formData.email;
        }
    } catch (err) {
      
      }
      try {
        if(formData.message) {   
            form.message.value = formData.message;
        }
    } catch (err) {
      
      }
}
// Функція додавання переглянутих фільмів
function onWatchedBtn (e) {
    // formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY_WATCHED, JSON.stringify(watchedData));
}
// Функція читання переглянутих фільмів
function viewListData() {
    const form = document.querySelector(".feedback-form");
    const saveMessage = localStorage.getItem(STORAGE_KEY);
    const formData = JSON.parse(saveMessage);
    try {
        if(formData.email) {   
            form.email.value = formData.email;
        }
    } catch (err) {
      
      }
      try {
        if(formData.message) {   
            form.message.value = formData.message;
        }
    } catch (err) {
      
      }
}
>>>>>>> Stashed changes
