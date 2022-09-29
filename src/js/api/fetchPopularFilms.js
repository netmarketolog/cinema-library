import NewApiService from './apiFn';
import addPagination from './pagination';
import createPopularFilmsMarkup from './renderMarkup';
import getRefs from '../getRefs';

export default function fetchPopularFilms() {
  const refs = getRefs();
  refs.spinner.classList.remove('is-hidden');
  const filmsPopular = new NewApiService();
  const url = '3/trending/movie/week';

  filmsPopular
    .fetchArticles(url)
    .then(r => {
      createPopularFilmsMarkup(r);
      addPagination(filmsPopular, url);
      refs.spinner.classList.add('is-hidden');
    })
    .catch(console.log);
}
