// Встановлення throttle

import throttle from 'lodash.throttle';

// Константи
const KEY_QUEUE = 'queue';
const KEY_WATCHED = 'watched';
let queueList = [];
let watchedList = [];

// Шлях до кнопок
const addToQueueBtn = document.querySelector("[data-addToQueue]");
const addToWatchedBtn = document.querySelector("[data-addToWatched]");

// Слухачі подій
addToQueueBtn.addEventListener('click', throttle(onQueueBtn, 500));
addToWatchedBtn.addEventListener('click', throttle(onWatchedBtn, 500));

// Функція для роботи зі сховищем
// Функція додавання фільмів до черги
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

