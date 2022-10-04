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
// let addQueueList = [];
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

  textBtn();
  // qwqw();
}

// 1 Привязатся к кнопкам
// 2 проверка текста на кнопке
// 3 проверять масив стореджа, есть ли ИД.
// 4 если нет ИД при клики на кнопку добоалять в сторедж
// 5 если есть ИД при клики на кнопку добоалять в сторедж


function textBtn() {
    if (refs.addToWatchedBtn.textContent.includes("add to watched")) {      
      refs.addToWatchedBtn.textContent = "remove from watched";
      return
    } else {
      refs.addToWatchedBtn.textContent = "add to watched";
    }
}

export default function forText() {
    addWatchedList = localStorage.getItem('watched');
  const parsedWotchedFilm = JSON.parse(localStorage.getItem('watched')) || [];
  parsedWotchedFilm.map(film => {
    console.log("film id map", Number(film.id)); 
    console.dir(refs.modalRendEl.firstChild.attributes.id.nodeValue);
    // console.log("Передвем ИД", Number(idFilm));Если передавать ИД по функции
     const idFilm = refs.modalRendEl.firstChild.attributes.id.nodeValue;
    if (Number(film.id )=== Number(idFilm)) {
      
            refs.addToWatchedBtn.textContent  = 'remove from watched';
            console.log('true',refs.addToWatchedBtn.textContent);
            return;
          } else {
            refs.addToWatchedBtn.textContent = 'add to watched';  
            console.log('else',refs.addToWatchedBtn.textContent);
          }
  
})}

// function textBtn() {
//   addWatchedList = localStorage.getItem('watched');
//   const parsedWotchedFilm = JSON.parse(addWatchedList);
//   parsedWotchedFilm.map(film => {
//     console.log(film);
//     const y = document.querySelector('.film__btn');
//     // refs.addToWatchedBtn.textContent = 'add to watched';
//     if (film.id === Number(y.id)) {
//       refs.addToWatchedBtn.textContent = 'remove from watched';
//     } else {
//       refs.addToWatchedBtn.textContent = 'add to watched';

//     }
//   });
// }
// export default function forText() {
//   addWatchedList = localStorage.getItem('watched');
//   const parsedWotchedFilm = JSON.parse(localStorage.getItem('watched')) || [];
//   parsedWotchedFilm.map(film => {
//     const y = document.querySelector('.film__btn');
//     // refs.addToWatchedBtn.textContent = 'add to watched';
//     // console.log('film.id', film.id);
//     // console.log('Number(y.id)',Number(y.id));
//     if (film.id === Number(y.id)) {
//       console.dir(refs.addToWatchedBtn);
//       refs.addToWatchedBtn.textContent  = 'remove from watched';
//       console.log(refs.addToWatchedBtn.textContent);
//     } else {
//       refs.addToWatchedBtn.textContent = 'add to watched';
//       console.log(refs.addToWatchedBtn.textContent);
      
//     }
//     if (film.id === Number(y.id)) {
//   console.dir(refs.addToWatchedBtn);
//   refs.addToWatchedBtn.innerHTML  = `<button type="button" class="film__btn film__btn--add" data-addToWatched>
//   remove from watched
// </button>;`
//   console.log(refs.addToWatchedBtn.textContent);
// } 
//   refs.addToWatchedBtn.innerHTML = `<button type="button" class="film__btn film__btn--add" data-addToWatched>
//   add to watched
// </button>`;
//   });
// }

// if (film.id === Number(y.id)) {
//   console.dir(refs.addToWatchedBtn);
//   refs.addToWatchedBtn.innerHTML  = `<button type="button" class="film__btn film__btn--add" data-addToWatched>
//   remove from watched
// </button>;`
//   console.log(refs.addToWatchedBtn.textContent);
// } 
//   refs.addToWatchedBtn.innerHTML = `<button type="button" class="film__btn film__btn--add" data-addToWatched>
//   add to watched
// </button>`;

// function qwqw() {
//   const savedWotchedFilm = localStorage.getItem('watched');
//   const parsedWotchedFilm = JSON.parse(savedWotchedFilm);
//   if (!parsedWotchedFilm) {
//     return;
//   }
//   parsedWotchedFilm.map(muvieId => {
//     addWatchedList.push(muvieId);
//   });
// }

//изменение текста кнопок
// 1 менять текст на кнопке
export { forText, onQueueBtn, onWatchedBtn };
// function textBtn() {
//   console.log(watchedList);
//   watchedList.map(film => {
//     const y = document.querySelectorAll('.film_btn--add');
//     y.forEach(li => {
//       if (film.id === Number(li.id)) {
//         refs.addToWatchedBtn.textContent = 'text';
//       } else if (film.id !== Number(li.id)) {
//         refs.addToWatchedBtn.textContent = 'qwrqewtyrtwr  qtewweqw';
//       }
//     });
//   });
// }
