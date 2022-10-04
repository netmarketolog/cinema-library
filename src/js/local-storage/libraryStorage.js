import filmsMarkup from './libraryCard';
import getRefs from '../getRefs';
import closeModal from '../modal-film';
import '../modal-film';
import '../local-storage/addToLStorage';
import addPagination from '../api/libraryPagination';
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
  refs.pagination.classList.add('is-hidden');
  refs.watchedBtn.setAttribute('disabled', true);
  refs.queueBtn.removeAttribute('disabled');
  refs.addToWatchedBtn.textContent = 'Remove from Watched';
  refs.addToQueueBtn.textContent = 'Add to Queue';
  refs.addToQueueBtn.removeEventListener('click', onDeleteQueue);
  refs.addToWatchedBtn.removeEventListener('click', addToWatched);
  refs.addToWatchedBtn.addEventListener('click', onDeleteWatched);
  refs.addToQueueBtn.addEventListener('click', addToQueue);
  refs.queueBtn.classList.remove('is-active');
  refs.watchedBtn.classList.add('is-active');
  onRemoveQueue();
  refs.spinner.classList.remove('is-hidden');
  setTimeout(() => {
    watchedMarkup();
  }, 400);
}

function onQueueVideo() {
  refs.pagination.classList.add('is-hidden');
  refs.queueBtn.setAttribute('disabled', true);
  refs.watchedBtn.removeAttribute('disabled');
  refs.addToWatchedBtn.textContent = 'Add to Watched';
  refs.addToQueueBtn.textContent = 'Remove from Queue';
  refs.addToWatchedBtn.removeEventListener('click', onDeleteWatched);
  refs.addToQueueBtn.removeEventListener('click', addToQueue);
  refs.addToQueueBtn.addEventListener('click', onDeleteQueue);
  refs.addToWatchedBtn.addEventListener('click', addToWatched);
  refs.queueBtn.classList.add('is-active');
  refs.watchedBtn.classList.remove('is-active');
  onRemoveWatched();
  refs.spinner.classList.remove('is-hidden');
  setTimeout(() => {
    queueMarkup();
  }, 400);
}
function addToQueue() {
  const x = document.querySelector('.film__poster');
  const y = document.querySelectorAll('.card__item');
  y.forEach(li => {
    if (x.id === li.id) {
      addQueue.map(film => {
        if (film.id === Number(li.id)) {
          const x = addQueue.indexOf(film);
          addWatched.push(film);
          queue.push(film);
          addQueue.splice(x, 1);
          watched.splice(x, 1);
          li.remove();
          closeModal();
          refs.spinner.classList.remove('is-hidden');

          const savedWatced = localStorage.getItem('watched');
          const parsedWatced = JSON.parse(savedWatced);
          localStorage.removeItem('watched', parsedWatced);
          localStorage.setItem('watched', JSON.stringify(watched));

          const savedQueue = localStorage.getItem('queue');
          const parsedQueue = JSON.parse(savedQueue);
          localStorage.removeItem('queue', parsedQueue);
          localStorage.setItem('queue', JSON.stringify(queue));
          setTimeout(() => {
            watchedMarkup();
          }, 400);
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
      addWatched.map(film => {
        if (film.id === Number(li.id)) {
          const x = addWatched.indexOf(film);
          addQueue.push(film);
          watched.push(film);
          addWatched.splice(x, 1);
          queue.splice(x, 1);
          li.remove();
          closeModal();
          refs.spinner.classList.remove('is-hidden');

          const savedWatced = localStorage.getItem('watched');
          const parsedWatced = JSON.parse(savedWatced);
          localStorage.removeItem('watched', parsedWatced);
          localStorage.setItem('watched', JSON.stringify(watched));

          const savedQueue = localStorage.getItem('queue');
          const parsedQueue = JSON.parse(savedQueue);
          localStorage.removeItem('queue', parsedQueue);
          localStorage.setItem('queue', JSON.stringify(queue));
          setTimeout(() => {
            queueMarkup();
          }, 400);
        }
      });
    }
  });
}
function watchedMarkup() {
  const savedFilm = localStorage.getItem('watched');
  const parsedFilm = JSON.parse(savedFilm);

  // parsedFilm.map(muvieId => {
  //   filmsMarkup(muvieId);
  // });
  refs.pagination.classList.remove('is-hidden');
  addPagination(parsedFilm);
  refs.spinner.classList.add('is-hidden');
}

function queueMarkup() {
  const savedFilm = localStorage.getItem('queue');
  const parsedFilm = JSON.parse(savedFilm);
  // parsedFilm.map(muvieId => {
  //   filmsMarkup(muvieId);
  // });
  refs.pagination.classList.remove('is-hidden');
  addPagination(parsedFilm);
  refs.spinner.classList.add('is-hidden');
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
          refs.spinner.classList.remove('is-hidden');

          const savedSettings = localStorage.getItem('queue');
          const parsedSettings = JSON.parse(savedSettings);
          localStorage.removeItem('queue', parsedSettings);

          localStorage.setItem('queue', JSON.stringify(queue));

          setTimeout(() => {
            queueMarkup();
          }, 400);
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
          refs.spinner.classList.remove('is-hidden');

          const savedSettings = localStorage.getItem('watched');
          const parsedSettings = JSON.parse(savedSettings);
          localStorage.removeItem('watched', parsedSettings);

          localStorage.setItem('watched', JSON.stringify(watched));
          setTimeout(() => {
            watchedMarkup();
          }, 400);
        }
      });
    }
  });
}
