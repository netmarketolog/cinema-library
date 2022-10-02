import filmsMarkup from './libraryCard';
import getRefs from '../getRefs';
import closeModal from '../modal-film';
import '../modal-film';
import '../local-storage/addToLStorage';
const refs = getRefs();

refs.watchedBtn.addEventListener('click', onWatchedVideo);
refs.queueBtn.addEventListener('click', onQueueVideo);

let watched = [];
let queue = [];
const savedQueueFilm = localStorage.getItem('queue');
const parsedQueueFilm = JSON.parse(savedQueueFilm);
parsedQueueFilm.map(muvieId => {
  queue.push(muvieId);
});

const savedWotchedFilm = localStorage.getItem('watched');
const parsedWotchedFilm = JSON.parse(savedWotchedFilm);
parsedWotchedFilm.map(muvieId => {
  watched.push(muvieId);
});

function onWatchedVideo() {
  refs.watchedBtn.setAttribute('disabled', true);
  refs.queueBtn.removeAttribute('disabled');
  refs.addToWatchedBtn.textContent = 'Remove from Watched';
  refs.addToQueueBtn.textContent = 'Add to Queue';
  refs.addToWatchedBtn.addEventListener('click', onDeleteWatched);
  refs.addToQueueBtn.removeEventListener('click', onDeleteQueue);
  onRemoveQueue();
  watchedMarkup();
}

function onQueueVideo() {
  refs.queueBtn.setAttribute('disabled', true);
  refs.watchedBtn.removeAttribute('disabled');
  refs.addToWatchedBtn.textContent = 'Add to Watched';
  refs.addToQueueBtn.textContent = 'Remove from Queue';
  refs.addToQueueBtn.addEventListener('click', onDeleteQueue);
  onRemoveWatched();
  queueMarkup();
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
      console.log(x.id);
      console.log(li.id);
      queue.map(film => {
        console.log(film.id);
        if (film.id === Number(li.id)) {
          console.log(film.id);
          console.log(li.id);
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
      console.log(x.id);
      console.log(li.id);
      watched.map(film => {
        console.log(film.id);
        if (film.id === Number(li.id)) {
          console.log(film.id);
          console.log(li.id);
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
console.log(queue);
