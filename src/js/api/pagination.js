import Pagination from 'tui-pagination';
import getRefs from '../getRefs';
import createPopularFilmsMarkup from './renderMarkup';

export default function addPagination(_class, url) {
  const refs = getRefs();
  const pagination = new Pagination('pagination', {
    totalItems: _class.totalFilms,
    itemsPerPage: 20,
    centerAlign: true,
    visiblePages: 5,
  });
  pagination.on('beforeMove', function (e) {
    refs.spinner.classList.remove('is-hidden');
    _class.page = e.page;
    _class.fetchArticles(url).then(r => {
      createPopularFilmsMarkup(r);
      refs.spinner.classList.add('is-hidden');
    });
  });
}
