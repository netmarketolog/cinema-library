import allGenres from '../../genres.json';
import getRefs from '../getRefs';

export default function createPopularFilmsMarkup(films) {
  const refs = getRefs();
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
      for (let genre of allGenres) {
        if (id === genre.id) {
          return genre.name;
        }
      }
    })
    .join(', ');
}
