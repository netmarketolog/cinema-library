import filmsMarkup from './libraryCard';
import getRefs from '../getRefs';
import closeModal from '../modal-film';
import '../modal-film';
import '../local-storage/addToLStorage';
const refs = getRefs();

onQueueVideo();
refs.watchedBtn.addEventListener('click', onWatchedVideo);
refs.queueBtn.addEventListener('click', onQueueVideo);

let watched = [];
let queue = [];
let addWatched = [];
let addQueue = [];
const savedQueueFilm = localStorage.getItem('queue');
const parsedQueueFilm = JSON.parse(savedQueueFilm);
parsedQueueFilm.map(muvieId => {
  queue.push(muvieId);
  addWatched.push(muvieId);
});

const savedWotchedFilm = localStorage.getItem('watched');
const parsedWotchedFilm = JSON.parse(savedWotchedFilm);
parsedWotchedFilm.map(muvieId => {
  watched.push(muvieId);
  addQueue.push(muvieId);
});

function onWatchedVideo() {
  refs.watchedBtn.setAttribute('disabled', true);
  refs.queueBtn.removeAttribute('disabled');
  refs.addToWatchedBtn.textContent = 'Remove from Watched';
  refs.addToQueueBtn.textContent = 'Add to Queue';
  refs.addToWatchedBtn.addEventListener('click', onDeleteWatched);
  refs.addToQueueBtn.addEventListener('click', addToQueue);
  refs.queueBtn.classList.remove('is-active');
  refs.watchedBtn.classList.add('is-active');
  onRemoveQueue();
  watchedMarkup();
}

function onQueueVideo() {
  refs.queueBtn.setAttribute('disabled', true);
  refs.watchedBtn.removeAttribute('disabled');
  refs.addToWatchedBtn.textContent = 'Add to Watched';
  refs.addToQueueBtn.textContent = 'Remove from Queue';
  refs.addToQueueBtn.addEventListener('click', onDeleteQueue);
  refs.addToWatchedBtn.addEventListener('click', addToWatched);
  refs.queueBtn.classList.add('is-active');
  refs.watchedBtn.classList.remove('is-active');
  onRemoveWatched();
  queueMarkup();
}
function addToQueue() {
  const x = document.querySelector('.film__poster');
  const y = document.querySelectorAll('.card__item');
  y.forEach(li => {
    if (x.id === li.id) {
      console.log(x.id);
      console.log(li.id);
      addQueue.map(film => {
        console.log(film.id);
        if (film.id === Number(li.id)) {
          console.log(film.id);
          console.log(li.id);
          const x = addQueue.indexOf(film);
          console.log(x);
          addWatched.push(film);
          queue.push(film);
          addQueue.splice(x, 1);
          watched.splice(x, 1);
          li.remove();
          closeModal();

          const savedWatced = localStorage.getItem('watched');
          const parsedWatced = JSON.parse(savedWatced);
          localStorage.removeItem('watched', parsedWatced);
          localStorage.setItem('watched', JSON.stringify(watched));

          const savedQueue = localStorage.getItem('queue');
          const parsedQueue = JSON.parse(savedQueue);
          localStorage.removeItem('queue', parsedQueue);
          localStorage.setItem('queue', JSON.stringify(queue));
        }
      });
    }
  });
}

function addToWatched() {
  const x = document.querySelector('.film__poster');
  const y = document.querySelectorAll('.card__item');
  y.forEach(li => {
    if (x.id === li.id) {
      console.log(x.id);
      console.log(li.id);
      addWatched.map(film => {
        console.log(film.id);
        if (film.id === Number(li.id)) {
          console.log(film.id);
          console.log(li.id);
          const x = addWatched.indexOf(film);
          console.log(x);
          addQueue.push(film);
          watched.push(film);
          addWatched.splice(x, 1);
          queue.splice(x, 1);
          li.remove();
          closeModal();

          const savedWatced = localStorage.getItem('watched');
          const parsedWatced = JSON.parse(savedWatced);
          localStorage.removeItem('watched', parsedWatced);
          localStorage.setItem('watched', JSON.stringify(watched));

          const savedQueue = localStorage.getItem('queue');
          const parsedQueue = JSON.parse(savedQueue);
          localStorage.removeItem('queue', parsedQueue);
          localStorage.setItem('queue', JSON.stringify(queue));
        }
      });
    }
  });
}
function watchedMarkup() {
  const savedFilm = localStorage.getItem('watched');
  const parsedFilm = JSON.parse(savedFilm);

  parsedFilm.map(muvieId => {
    filmsMarkup(muvieId);
  });
}

function queueMarkup() {
  const savedFilm = localStorage.getItem('queue');
  const parsedFilm = JSON.parse(savedFilm);
  parsedFilm.map(muvieId => {
    filmsMarkup(muvieId);
  });
}

function onRemoveWatched() {
  const remuve = document.querySelectorAll('.card__item');
  remuve.forEach(li => {
    li.remove();
  });
}

function onRemoveQueue() {
  const remuve = document.querySelectorAll('.card__item');
  remuve.forEach(li => {
    li.remove();
  });
}

function onDeleteQueue() {
  const x = document.querySelector('.film__poster');
  const y = document.querySelectorAll('.card__item');
  y.forEach(li => {
    if (x.id === li.id) {
      queue.map(film => {
        if (film.id === Number(li.id)) {
          const x = queue.indexOf(film);
          queue.splice(x, 1);
          li.remove();
          closeModal();

          const savedSettings = localStorage.getItem('queue');
          const parsedSettings = JSON.parse(savedSettings);
          localStorage.removeItem('queue', parsedSettings);

          localStorage.setItem('queue', JSON.stringify(queue));
        }
      });
    }
  });
}

function onDeleteWatched() {
  const x = document.querySelector('.film__poster');
  const y = document.querySelectorAll('.card__item');
  y.forEach(li => {
    if (x.id === li.id) {
      watched.map(film => {
        if (film.id === Number(li.id)) {
          const x = watched.indexOf(film);
          watched.splice(x, 1);
          li.remove();
          closeModal();

          const savedSettings = localStorage.getItem('watched');
          const parsedSettings = JSON.parse(savedSettings);
          localStorage.removeItem('watched', parsedSettings);

          localStorage.setItem('watched', JSON.stringify(watched));
        }
      });
    }
  });
}
console.log(watched);
