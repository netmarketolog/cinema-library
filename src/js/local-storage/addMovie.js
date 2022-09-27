// Встановлення throttle

import throttle from 'lodash.throttle';

// Константи
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

// Слухачі подій
addToQueueBtn.addEventListener('click', throttle(onQueueBtn, 500));
addToWatchedBtn.addEventListener('click', throttle(onWatchedBtn, 500));

// Функція для роботи зі сховищем
// Функція додавання фільмів до черги
function onQueueBtn (e) {
    // modalData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(queueData));
}
// Функція читання фільмів в черзі
// function queueListData() {
//     const form = document.querySelector(".feedback-form");
//     const saveMessage = localStorage.getItem(STORAGE_KEY);
//     const formData = JSON.parse(saveMessage);
//     try {
//         if(formData.email) {   
//             form.email.value = formData.email;
//         }
//     } catch (err) {
      
//       }
//       try {
//         if(formData.message) {   
//             form.message.value = formData.message;
//         }
//     } catch (err) {
      
//       }
// }
// Функція додавання переглянутих фільмів
function onWatchedBtn (e) {
    // formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY_WATCHED, JSON.stringify(watchedData));
}
// Функція читання переглянутих фільмів
// function viewListData() {
//     const form = document.querySelector(".feedback-form");
//     const saveMessage = localStorage.getItem(STORAGE_KEY);
//     const formData = JSON.parse(saveMessage);
//     try {
//         if(formData.email) {   
//             form.email.value = formData.email;
//         }
//     } catch (err) {
      
//       }
//       try {
//         if(formData.message) {   
//             form.message.value = formData.message;
//         }
//     } catch (err) {
      
//       }
// }