// Імпорт
// import getRefs from '../getRefs';

// Встановлення throttle
// import throttle from 'lodash.throttle';

// Слухачі подій
// const refs = getRefs();
// refs.addToQueueBtn.addEventListener('click', throttle(onQueueBtn, 500));
// refs.addToWatchedBtn.addEventListener('click', throttle(onWatchedBtn, 500));

// Константи
// const KEY_QUEUE = 'queue';
// const KEY_WATCHED = 'watched';

let queueList = [];
let watchedList = [];

// Функція для роботи зі сховищем
// Функція додавання фільмів до черги
function onQueueBtn(film) {
  const KEY_QUEUE = 'queue';
  if (queueList.includes(film)) {
    return;
  } else {
    queueList.push(film);
  }
  localStorage.setItem(KEY_QUEUE, JSON.stringify(queueList));
}
// Функція додавання переглянутих фільмів
function onWatchedBtn(film) {
  const KEY_WATCHED = 'watched';
  // const KEY_QUEUE = 'queue';
  if (watchedList.includes(film)) {
    return;
  }
  else {
    // const saveQueueFilms = localStorage.getItem(KEY_QUEUE);
    // const parseQueueFilms = JSON.parse(saveQueueFilms);
    // // const queueFilmsID = parseQueueFilms.map(film.id)

    // if (film === parseQueueFilms.includes(film)) {
    // const indexFilm = parseQueueFilms.indexOf(film);
    // const overwriting = parseQueueFilms.splice(indexFilm, 1);
    // localStorage.setItem(KEY_QUEUE, JSON.stringify(overwriting));
    
    // }
    watchedList.push(film);
  }

  localStorage.setItem(KEY_WATCHED, JSON.stringify(watchedList));
  // console.log(parseQueueFilms);

}

export { onQueueBtn, onWatchedBtn };
