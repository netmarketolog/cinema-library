import NewApiService from './apiFn';
import createPagination from './pagination';
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
      let totalPages = filmsPopular.allFilms / 20;
      let page = filmsPopular.page;

      refs.paginationEl.innerHTML = createPagination(
        totalPages,
        page,
        refs.paginationEl
      );

      refs.paginationEl.addEventListener('click', e => {
        // e.preventDefault();
        refs.spinner.classList.remove('is-hidden');
        const _page = e.target.closest('li');

        filmsPopular.page = Number(_page.id);
        filmsPopular.fetchArticles(url).then(r => {
          createPopularFilmsMarkup(r);
          refs.spinner.classList.add('is-hidden');
        });

        refs.paginationEl.innerHTML = createPagination(
          totalPages,
          Number(_page.id),
          refs.paginationEl
        );
      });
      refs.spinner.classList.add('is-hidden');
    })
    .catch(console.log);
}
