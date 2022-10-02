import { Notify } from 'notiflix/build/notiflix-notify-aio';

const KEY_QUEUE = 'queue';
const KEY_WATCHED = 'watched';

let queueList = [];
let watchedList = [];

// Функція для роботи зі сховищем
// Функція додавання фільмів до черги
function onQueueBtn(film) {
  if (queueList.find(queueList => queueList.id === film.id)) {
    return;
  } else {
    queueList.push(film);
  }
  localStorage.setItem(KEY_QUEUE, JSON.stringify(queueList));
}
// Функція додавання переглянутих фільмів
function onWatchedBtn(id) {
  local = JSON.parse(localStorage.getItem(KEY_QUEUE));
  queueList.map(film => {
    if (id === film.id) {
      watchedList.push(film);
      const indexId = queueList.indexOf(film);
      queueList.splice(indexId, 1);
    }
  });
  localStorage.setItem(KEY_QUEUE, JSON.stringify(queueList));
  localStorage.setItem(KEY_WATCHED, JSON.stringify(watchedList));
}

export { onQueueBtn, onWatchedBtn };
