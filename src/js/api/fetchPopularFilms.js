import NewApiService from './apiFn';
import Pagination from 'tui-pagination';
import createPopularFilmsMarkup from './renderMarkup';
import getRefs from '../getRefs';

export default function fetchPopularFilms() {
  const refs = getRefs();
  refs.spinner.classList.remove('is-hidden');
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
        refs.spinner.classList.remove('is-hidden');
        const newPage = e.page;
        filmsPopular.fetchArticles(newPage).then(r => {
          createPopularFilmsMarkup(r);
          refs.spinner.classList.add('is-hidden');
        });
      });
      refs.spinner.classList.add('is-hidden');
    })
    .catch(console.log);
}
