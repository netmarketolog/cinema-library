import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '300px',
  position: 'right-bottom',
  closeButton: false,
});

const refs = {
  addToQueueBtn: document.querySelector('[data-addToQueue]'),
  addToWatchedBtn: document.querySelector('[data-addToWatched]'),
  modalRendEl: document.querySelector('.film__container'),
};
const KEY_QUEUE = 'queue';
const KEY_WATCHED = 'watched';

let queueList = [];
let watchedList = [];
let addQueueList = [];
let addWatchedList = [];

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

  localStorage.setItem(KEY_QUEUE, JSON.stringify(queueList));
  editTextBtnAddQueue();
}
// Функція додавання переглянутих фільмів
function onWatchedBtn(film) {
  if (localStorage.getItem(KEY_QUEUE)) {
    queueList = JSON.parse(localStorage.getItem(KEY_QUEUE));
  }
  if (localStorage.getItem(KEY_WATCHED)) {
    watchedList = JSON.parse(localStorage.getItem(KEY_WATCHED));
  }

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

  localStorage.setItem(KEY_WATCHED, JSON.stringify(watchedList));

  editTextBtnAddWatched();
  
}

// 1 Привязатся к кнопкам
// 2 проверка текста на кнопке
// 3 проверять масив стореджа, есть ли ИД.
// 4 если нет ИД при клики на кнопку добоалять в сторедж
// 5 если есть ИД при клики на кнопку добоалять в сторедж

// если одна кнопка ремов, то при клики на добавление - ремов меняется на добавление
// if( refs.addToQueueBtn.textContent.includes("remove from queue"))
function editTextBtnAddQueue() {
  if (refs.addToQueueBtn.textContent.includes("add to queue")) {      
    refs.addToQueueBtn.textContent = "remove from queue";
    return
  } else {
    refs.addToQueueBtn.textContent = "add to queue";
  }
}


export default function checkLSAndBtnTextOutputQueue() {
  addQueueList = localStorage.getItem('queue');
const parsedWotchedFilm = JSON.parse(localStorage.getItem('queue')) || [];
parsedWotchedFilm.find(film => {
  // console.log("film id map", Number(film.id)); 
  // console.dir(refs.modalRendEl.firstChild.attributes.id.nodeValue);
  // console.log("Передвем ИД", Number(idFilm));Если передавать ИД по функции
   const idFilm = refs.modalRendEl.firstChild.attributes.id.nodeValue;
  if (Number(film.id )=== Number(idFilm)) {
    
          refs.addToQueueBtn.textContent  = 'remove from queue';
          // console.log('true',refs.addToQueueBtn.textContent);
          return refs.addToQueueBtn.textContent;
        } else {
          refs.addToQueueBtn.textContent = 'add to queue';  
          // console.log('else',refs.addToQueueBtn.textContent);
        }
}
)}
function editTextBtnAddWatched() {
    if (refs.addToWatchedBtn.textContent.includes("add to watched")) {      
      refs.addToWatchedBtn.textContent = "remove from watched";
      return
    } else {
      refs.addToWatchedBtn.textContent = "add to watched";
    }
}


// forText

export default function checkLSAndBtnTextOutputWatched() {
    addWatchedList = localStorage.getItem('watched');
  const parsedWotchedFilm = JSON.parse(localStorage.getItem('watched')) || [];
  parsedWotchedFilm.find(film => {
    // console.log("film id map", Number(film.id)); 
    // console.dir(refs.modalRendEl.firstChild.attributes.id.nodeValue);
     const idFilm = refs.modalRendEl.firstChild.attributes.id.nodeValue;
    if (Number(film.id )=== Number(idFilm)) {
      
            refs.addToWatchedBtn.textContent  = 'remove from watched';
            // console.log('true',refs.addToWatchedBtn.textContent);
            return refs.addToWatchedBtn.textContent;
          } else {
            refs.addToWatchedBtn.textContent = 'add to watched';  
            // console.log('else',refs.addToWatchedBtn.textContent);
            
          }
  
}
)}


export {  checkLSAndBtnTextOutputQueue, checkLSAndBtnTextOutputWatched, onQueueBtn, onWatchedBtn };


