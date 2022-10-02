import filmsMarkup from './libraryCard';
import getRefs from '../getRefs';
import closeModal from '../modal-film';
import '../modal-film';
import '../local-storage/addToLStorage';
const refs = getRefs();

refs.watchedBtn.addEventListener('click', onWatchedVideo);
refs.queueBtn.addEventListener('click', onQueueVideo);
refs.addToWatchedBtn.addEventListener('click', onDeleteWatched);
refs.addToQueueBtn.addEventListener('click', onDeleteQueue);

function onWatchedVideo() {
  refs.watchedBtn.setAttribute('disabled', true);
  refs.queueBtn.removeAttribute('disabled');
  refs.addToWatchedBtn.textContent = 'Remove from Watched';
  refs.addToQueueBtn.textContent = 'Add to Queue';

  const savedFilm = localStorage.getItem('watched');
  const parsedFilm = JSON.parse(savedFilm);

  onRemoveQueue();

  parsedFilm.map(muvieId => {
    filmsMarkup(muvieId);
  });
}

function onQueueVideo() {
  refs.queueBtn.setAttribute('disabled', true);
  refs.watchedBtn.removeAttribute('disabled');
  refs.addToWatchedBtn.textContent = 'Add to Watched';
  refs.addToQueueBtn.textContent = 'Remove from Queue';

  const savedFilm = localStorage.getItem('queue');
  const parsedFilm = JSON.parse(savedFilm);

  onRemoveWatched();

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

function onDeleteWatched() {
  const x = document.querySelector('.film__poster');
  const y = document.querySelectorAll('.card__item');
  y.forEach(li => {
    if (x.id === li.id) {
      li.remove();
      closeModal();
      const savedSettings = localStorage.getItem('queue');
      const parsedSettings = JSON.parse(savedSettings);
      // parsedSettings.map(muvieId => {
      //   localStorage.removeItem('watched', muvieId.id);
      //   console.log(muvieId.id);
      // });
    }
  });
}

function onDeleteQueue() {
  const x = document.querySelector('.film__poster');
  const y = document.querySelectorAll('.card__item');
  y.forEach(li => {
    if (x.id === li.id) {
      li.remove();
      closeModal();
      const savedSettings = localStorage.getItem('watched');
      const parsedSettings = JSON.parse(savedSettings);
      // parsedSettings.map(muvieId => {
      //   localStorage.removeItem('watched', muvieId.id);
      //   console.log(muvieId.id);
      // });
    }
  });
}
