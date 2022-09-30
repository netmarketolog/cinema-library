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

searchForm.addEventListener(`submit`, onSearch);
function onSearch(e) {
  e.preventDefault();
  filmApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  filmApiService.resetPage();
  if (filmApiService.query === '') {
    return typeSomething();
  }
  searchForm.reset();
  const url = '3/search/movie';
  filmApiService.fetchArticles(url, true).then(r => {
    if (filmApiService.allFilms === 0) {
      // return Notify.failure(
      //   'Search result not succsessful. Enter the correct movie name and try again!'
      // )
      return errorMs.classList.remove('is-hidden');
    }
    errorMs.classList.add('is-hidden');
    createPopularFilmsMarkup(r);
    let totalPages = filmApiService.allFilms / 20;
    let page = filmApiService.page;

    refs.paginationEl.innerHTML = createPagination(
      totalPages,
      page,
      refs.paginationEl
    );
    refs.paginationEl.addEventListener('click', e => {
      refs.spinner.classList.remove('is-hidden');
      const _page = e.target.closest('li');

      filmApiService.page = Number(_page.id);
      filmApiService.fetchArticles(url, true).then(r => {
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
};

function typeSomething() {
  Notiflix.Notify.info(`Please type something`);
};