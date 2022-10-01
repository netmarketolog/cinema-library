import filmsMarkup from './libraryCard';
import getRefs from '../getRefs';
const refs = getRefs();

refs.watchedBtn.addEventListener('click', onWatchedVideo);
refs.queueBtn.addEventListener('click', onQueueVideo);

function onWatchedVideo() {
  refs.watchedBtn.setAttribute('disabled', true);
  refs.queueBtn.removeAttribute('disabled');

  const savedFilm = localStorage.getItem('watched');
  const parsedFilm = JSON.parse(savedFilm);

  onRemoveQueue();
  // onBtnCustomWatched()

  parsedFilm.map(muvieId => {
    filmsMarkup(muvieId);
  });
}

function onQueueVideo() {
  refs.queueBtn.setAttribute('disabled', true);
  refs.watchedBtn.removeAttribute('disabled');

  const savedFilm = localStorage.getItem('queue');
  const parsedFilm = JSON.parse(savedFilm);

  onRemoveWatched();
  // onBtnCustomQueue()

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
