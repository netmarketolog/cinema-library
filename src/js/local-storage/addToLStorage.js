import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '300px',
  position: 'right-bottom',
  closeButton: false,
});

const KEY_QUEUE = 'queue';
const KEY_WATCHED = 'watched';

let queueList = [];
let watchedList = [];

// Функція для роботи зі сховищем
// Функція додавання фільмів до черги
function onQueueBtn(film) {
  if (queueList === []) {
    queueList.push(film);
    Notify.success('Your movie has been added to the queue');
  }
  if (queueList.find(queueList => queueList.id === film.id)) {
    Notify.info('You already have this movie in your queue');
    return;
  } else {
    queueList.push(film);
    Notify.success('Your movie has been added to the queue');
    if (watchedList !== []) {
      watchedList.map(films => {
      if (film.id === films.id) {
        const indexId = watchedList.indexOf(films);
        watchedList.splice(indexId, 1);
        Notify.warning('Rewatching the movie');
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
    Notify.success('Your movie has been watched');
  }
  if (watchedList.find(watchedList => watchedList.id === film.id)) {
    Notify.info('This movie has already been viewed');
    return;
  } else {
    watchedList.push(film);
    Notify.success('Your movie has been watched');
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
