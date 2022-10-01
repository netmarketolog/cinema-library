const API_KEY = '8fa17eefa9c2b424e1a30217c39bc412';
import getRefs from './getRefs';
import { onQueueBtn, onWatchedBtn } from './local-storage/addToLStorage';
import throttle from 'lodash.throttle';

// Modal
const refs = getRefs();
let isCardMovie = null;
refs.popularFilmsList.addEventListener('click', e => {
  e.preventDefault();
  isCardMovie = e.target.closest('.card__item');
  // console.log(isCardMovie.id);
  if (!isCardMovie) {
    return;
  }

  openModal(Number(isCardMovie.id));

  refs.popularFilmsList.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  return isCardMovie;
});

async function fetchDescr(filmId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=${API_KEY}&language=en-US`
  );
  const descriptionFilm = await response.json();
  return descriptionFilm;
}

function altw() {
  onWatchedBtn(Number(isCardMovie.id));
}
let altq = null;
function openModal(movie) {
  fetchDescr(movie).then(film => {
    altq = () => {
      onQueueBtn(film);
    };
    refs.addToWatchedBtn.addEventListener('click', altw);
    refs.addToQueueBtn.addEventListener('click', altq);

    refs.modalRendEl.innerHTML = `<div class="film__poster" id=${film.id}>
        <img
          src="https://image.tmdb.org/t/p/w500/${film.poster_path}"
          alt="${film.original_title}"
          loading="lazy"
          class="film__img"
        />
      </div>
      <div class="film__info">
        <h2 class="film__title">${film.original_title}</h2>
        <div class="film__description">
          <table>
            <tbody>
              <tr>
                <th class="film__attribute">Vote / Votes</th>
                <td class="film__att-value">
                  <span class="film__vote">${film.vote_average.toFixed(
                    1
                  )}</span> /
                  <span class="film__votes">${film.vote_count}</span>
                </td>
              </tr>
              <tr>
                <th class="film__attribute">Popularity</th>
                <td class="film__att-value">${film.popularity.toFixed(1)}</td>
              </tr>
              <tr>
                <th class="film__attribute">Original Title</th>
                <td class="film__att-value">${film.original_title}</td>
              </tr>
              <tr>
                <th class="film__attribute">Genre</th>
                <td class="film__att-value">${film.genres
                  .map(genre => genre.name)
                  .join(', ')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="film__about">
          <h3 class="film__about-title">About</h3>
          <p class="film__text">${film.overview}</p>
        </div>`;
  });

  refs.modalEl.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');

  const btnClose = document.querySelector('.modal-film__close-btn');
  btnClose.addEventListener('click', () => closeModal());
}

function closeModal() {
  refs.modalEl.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  refs.addToWatchedBtn.removeEventListener('click', altw);
  refs.addToQueueBtn.removeEventListener('click', altq);
}

//close
window.addEventListener('click', e => {
  if (e.target === refs.modalEl) {
    closeModal();
  }
});
