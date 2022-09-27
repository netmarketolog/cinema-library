// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import "./js/getRefs"
import NewApiService from './js/api/apiFn';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import allGenres from './genres.json';

const refs = {
  popularFilmsList: document.querySelector('.container__main'),
};

const filmsPopular = new NewApiService();
filmsPopular
  .fetchArticles(1)
  .then(r => {
    createPopularFilmsMarkup(r);
    const pagination = new Pagination('pagination', {
      totalItems: filmsPopular.totalFilms,
      itemsPerPage: 20,
      centerAlign: true,
      visiblePages: 5,
    });
    pagination.on('beforeMove', function (e) {
      const newPage = e.page;
      filmsPopular
        .fetchArticles(newPage)
        .then(r => createPopularFilmsMarkup(r));
    });
  })
  .catch(console.log('ERROR!!!'));

// const container = document.getElementById('pagination');

function createPopularFilmsMarkup(films) {
  const markup = films
    .map(film => {
      const genres = getGenresOfFilm(film);
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

function getGenresOfFilm(film) {
  return film.genre_ids
    .map(id => {
      for (genre of allGenres) {
        if (id === genre.id) {
          return genre.name;
        }
      }
    })
    .join(', ');
}
