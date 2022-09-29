import NewApiService from '../api/apiFn';
import createPopularFilmsMarkup from '../api/renderMarkup';
import Pagination from 'tui-pagination';
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
    createPopularFilmsMarkup(r);
    const pagination = new Pagination('pagination', {
      totalItems: filmApiService.totalFilms,
      itemsPerPage: 20,
      centerAlign: true,
      visiblePages: 5,
    });
    pagination.on('beforeMove', function (e) {
      refs.spinner.classList.remove('is-hidden');
      filmApiService.page = e.page;
      filmApiService.fetchArticles(url, true).then(r => {
        createPopularFilmsMarkup(r);
        refs.spinner.classList.add('is-hidden');
      });
    });
  });
}

function typeSomething() {
  Notiflix.Notify.info(`Please type something`);
}
