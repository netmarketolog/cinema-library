import NewApiService from './apiFn';
import Pagination from 'tui-pagination';
import createPopularFilmsMarkup from './renderMarkup';
import getRefs from '../getRefs';

export default function fetchPopularFilms() {
  const refs = getRefs();
  refs.spinner.classList.remove('is-hidden');
  const filmsPopular = new NewApiService();
  const url = '3/trending/movie/week';
  console.log(url);
  filmsPopular
    .fetchArticles(url, false)
    .then(r => {
      createPopularFilmsMarkup(r);
      const pagination = new Pagination('pagination', {
        totalItems: filmsPopular.totalFilms,
        itemsPerPage: 20,
        centerAlign: true,
        visiblePages: 5,
      });
      pagination.on('beforeMove', function (e) {
        refs.spinner.classList.remove('is-hidden');
        filmsPopular.page = e.page;
        filmsPopular.fetchArticles(url).then(r => {
          createPopularFilmsMarkup(r);
          refs.spinner.classList.add('is-hidden');
        });
      });
      refs.spinner.classList.add('is-hidden');
    })
    .catch(console.log);
}
