// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import "./js/getRefs"
import NewApiService from './js/api/apiFn';
import allGenres from './genres.json';

const refs = {
  popularFilmsList: document.querySelector('.container__main'),
};

const filmsFavour = new NewApiService();
filmsFavour.fetchArticles().then(r => createPopularFilmsMarkup(r));

function createPopularFilmsMarkup(films) {
  const markup = films
    .map(film => {
      const genres = film.genre_ids
        .map(id => {
          for (genre of allGenres) {
            if (id === genre.id) {
              return genre.name;
            }
          }
        })
        .join(', ');
      return `<li class="card__item" id=${film.id}>
        <a class="card__link" id="429473" href="#">
          <img
            src="https://image.tmdb.org/t/p/w500/${film.poster_path}"
            alt="${film.original_title}"
            class="card__poster"
          />

          <h2 class="card__title">${film.original_title}</h2>
          <div class="card__wrap">
            <p class="card__description">${genres} | ${film.release_date.slice(
        0,
        4
      )}</p>
            <p class="card__rating">${film.vote_average.toFixed(1)}</p>
          </div>
        </a>
      </li>`;
    })
    .join('');
  refs.popularFilmsList.innerHTML = markup;
}
