import { Notify } from 'notiflix/build/notiflix-notify-aio';

const KEY_QUEUE = 'queue';
const KEY_WATCHED = 'watched';

let queueList = [];
let watchedList = [];

// Функція для роботи зі сховищем
// Функція додавання фільмів до черги
function onQueueBtn(film) {
  if (queueList === []) {
    queueList.push(film);
  }
  if (queueList.find(queueList => queueList.id === film.id)) {
    return;
  } else {
    queueList.push(film);
    if (watchedList !== []) {
      watchedList.map(films => {
      if (film.id === films.id) {
      const indexId = watchedList.indexOf(films);
      watchedList.splice(indexId, 1);
      localStorage.setItem(KEY_WATCHED, JSON.stringify(watchedList));
      }
    });
    }
  }
  localStorage.setItem(KEY_QUEUE, JSON.stringify(queueList));
}
// Функція додавання переглянутих фільмів
function onWatchedBtn(film) {
  if (watchedList === []) {
    watchedList.push(film);
  }
  if (watchedList.find(watchedList => watchedList.id === film.id)) {
    return;
  } else {
      watchedList.push(film);
      if (queueList !== []) {
        queueList.map(films => {
        if (film.id === films.id) {
        const indexId = queueList.indexOf(films);
        queueList.splice(indexId, 1);
        localStorage.setItem(KEY_QUEUE, JSON.stringify(queueList));
        }
      });
    }
  }
  localStorage.setItem(KEY_WATCHED, JSON.stringify(watchedList));
}

export { onQueueBtn, onWatchedBtn };
