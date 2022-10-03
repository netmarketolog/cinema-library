import createPagination from './pagination';
import getRefs from '../getRefs';

const refs = getRefs();

export default function addPagination(array) {
  const totalPages = Math.ceil(array.length / 20);
  let page = 1;
  let films = array.slice(20 * page - 20, 20 * page);
  renderMarkupByPageOfLibrary(films);

  refs.paginationEl.innerHTML = createPagination(totalPages, page);
  refs.paginationEl.addEventListener('click', onPageBtnClick);

  function onPageBtnClick(e) {
    const _page = e.target.closest('li.numb');
    if (!_page) return;

    // refs.spinner.classList.remove('is-hidden');
    refs.spinner.classList.remove('is-hidden');
    page = Number(_page.id);
    films = array.slice(20 * page - 20, 20 * page);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
      });
      renderMarkupByPageOfLibrary(films);
      refs.spinner.classList.add('is-hidden');
    }, 400);
    // refs.spinner.classList.add('is-hidden');

    refs.paginationEl.innerHTML = createPagination(totalPages, page);
  }
}

function renderMarkupByPageOfLibrary(films) {
  const markup = films
    .map(film => {
      const genres = getGenresOfFilm(film);
      return `<li class="card__item" id=${film.id}>
        <a class="card__link" id="429473" href="#">
        ${
          film.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="${film.original_title}" class="card__poster" />`
            : `<img src="${noImage}" alt="${film.original_title}" class="card__poster" />`
        }
          <h2 class="card__title">${film.title || film.original_title}</h2>
          <div class="card__wrap">
            <p class="card__description">${genres} | ${
        film.release_date ? film.release_date.slice(0, 4) : 'none'
      }</p>
            <p class="card__rating">${film.vote_average.toFixed(1)}</p>
          </div>
        </a>
      </li>`;
    })
    .join('');
  refs.popularFilmsList.innerHTML = markup;
}

function getGenresOfFilm(film) {
  return film.genres.map(genres => genres.name).join(', ');
}
