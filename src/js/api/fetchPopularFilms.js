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
      let totalPages = Math.ceil(filmsPopular.allFilms / 20);
      let page = filmsPopular.page;

      refs.paginationEl.innerHTML = createPagination(
        totalPages,
        page,
        refs.paginationEl
      );

      refs.paginationEl.addEventListener('click', onPageBtnClick);
      if (filmsPopular.search) {
        refs.paginationEl.removeEventListener('click', onPageBtnClick);
        console.log('dwqqge');
      }
      console.log(filmsPopular.search);
      function onPageBtnClick(e) {
        const _page = e.target.closest('li.numb');
        if (!_page) return;
        // if (e.target.nodeName === 'UL') return console.log(e.target.nodeName);
        window.scrollTo({
          top: 0,
        });
        refs.spinner.classList.remove('is-hidden');

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
      }
      refs.spinner.classList.add('is-hidden');
    })
    .catch(console.log);
}
