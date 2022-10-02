import NewApiService from '../api/apiFn';
import createPopularFilmsMarkup from '../api/renderMarkup';
import createPagination from '../api/pagination';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from '../getRefs';
import Notiflix from 'notiflix';

const refs = getRefs();
const filmApiService = new NewApiService();
const searchForm = document.querySelector('#search-form');
const errorMs = document.querySelector('.error-search');

const url = '3/search/movie';
let totalPages = null;

refs.paginationEl.addEventListener('click', x);

function x(e) {
  const _page = e.target.closest('li.numb');
  if (!_page) return;
  window.scrollTo({
    top: 0,
  });
  if (!filmApiService.query) return;
  refs.spinner.classList.remove('is-hidden');

  filmApiService.page = Number(_page.id);
  filmApiService.fetchArticles(url, filmApiService.query).then(r => {
    createPopularFilmsMarkup(r);
    // refs.paginationEl.removeEventListener('click', x);
    refs.spinner.classList.add('is-hidden');
  });
  totalPages = Math.ceil(filmApiService.allFilms / 20);
  refs.paginationEl.innerHTML = createPagination(totalPages, Number(_page.id));
}

searchForm.addEventListener(`submit`, onSearch);
function onSearch(e) {
  e.preventDefault();

  filmApiService.seach = true;
  filmApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  filmApiService.resetPage();
  if (filmApiService.query === '') {
    return typeSomething();
  }
  searchForm.reset();

  filmApiService
    .fetchArticles(url, filmApiService.query)
    .then(r => {
      if (filmApiService.allFilms === 0) {
        // return Notify.failure(
        //   'Search result not succsessful. Enter the correct movie name and try again!'
        // )
        return errorMs.classList.remove('is-hidden');
      }
      errorMs.classList.add('is-hidden');
      createPopularFilmsMarkup(r);
      totalPages = Math.ceil(filmApiService.allFilms / 20);
      let page = filmApiService.page;

      refs.paginationEl.innerHTML = createPagination(totalPages, page);

      refs.spinner.classList.add('is-hidden');
    })
    .catch(console.log);
}

function typeSomething() {
  Notiflix.Notify.info(`Please type something`);
}
