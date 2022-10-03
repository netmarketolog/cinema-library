import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '300px',
  position: 'right-bottom',
  closeButton: false,
});

const refs = {
  addToQueueBtn: document.querySelector('[data-addToQueue]'),
  addToWatchedBtn: document.querySelector('[data-addToWatched]'),
};
const KEY_QUEUE = 'queue';
const KEY_WATCHED = 'watched';

let queueList = [];
let watchedList = [];
// localStorage.setItem(KEY_QUEUE, JSON.stringify(queueList));
// localStorage.setItem(KEY_WATCHED, JSON.stringify(watchedList));

// Функція для роботи зі сховищем
// Функція додавання фільмів до черги
function onQueueBtn(film) {
  if (localStorage.getItem(KEY_QUEUE)) {
    queueList = JSON.parse(localStorage.getItem(KEY_QUEUE));
  }
  if (localStorage.getItem(KEY_WATCHED)) {
    watchedList = JSON.parse(localStorage.getItem(KEY_WATCHED));
  }

  if (queueList.length > 0) {
    if (queueList.find(queueList => queueList.id === film.id)) {
      Notify.info('You already have this movie in your queue');
      return;
    }
  }
  queueList.push(film);

  Notify.success('Your movie has been added to the queue');
  if (watchedList.length > 0) {
    watchedList.map(films => {
      if (film.id === films.id) {
        const indexId = watchedList.indexOf(films);
        watchedList.splice(indexId, 1);
        Notify.warning('Rewatching the movie');
        localStorage.setItem(KEY_WATCHED, JSON.stringify(watchedList));
      }
    });
  }

  // changeTextQueue();
  localStorage.setItem(KEY_QUEUE, JSON.stringify(queueList));
}
// Функція додавання переглянутих фільмів
function onWatchedBtn(film) {
  if (localStorage.getItem(KEY_QUEUE)) {
    queueList = JSON.parse(localStorage.getItem(KEY_QUEUE));
  }
  if (localStorage.getItem(KEY_WATCHED)) {
    watchedList = JSON.parse(localStorage.getItem(KEY_WATCHED));
  }

  // if (watchedList === []) {
  //   watchedList.push(film);
  //   Notify.success('Your movie has been watched');
  // }
  if (watchedList.length > 0) {
    if (watchedList.find(watchedList => watchedList.id === film.id)) {
      Notify.info('This movie has already been viewed');
      return;
    }
  }
  watchedList.push(film);
  Notify.success('Your movie has been watched');
  if (queueList.length > 0) {
    queueList.map(films => {
      if (film.id === films.id) {
        const indexId = queueList.indexOf(films);
        queueList.splice(indexId, 1);
        localStorage.setItem(KEY_QUEUE, JSON.stringify(queueList));
      }
    });
  }

  // changeTextWatched();
  localStorage.setItem(KEY_WATCHED, JSON.stringify(watchedList));
}

//изменение текста кнопок

// function changeTextWatched() {
//   if (onWatchedBtn) {
//     refs.addToWatchedBtn.textContent = 'Adding to Watched successful';
//   }
// }

// function changeTextQueue() {
//   if (onQueueBtn) {
//     refs.addToQueueBtn.textContent = 'Adding to queue successful';
//   }
// }

export { onQueueBtn, onWatchedBtn };
