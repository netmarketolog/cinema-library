import FilmApiService from './film-service'

import createPopularFilmsMarkup from '../api/renderMarkup';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import getRefs from '../getRefs';
import Notiflix from 'notiflix';
const refs = getRefs()
const filmApiService = new FilmApiService();

const serchForm = document.querySelector('#search-form');

serchForm.addEventListener(`submit`, onSerch);

function onSerch(e) {
  e.preventDefault();
  filmApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  console.log(filmApiService.query);
  filmApiService.resetPage();
  if (filmApiService.query === '') {
    return typeSomething();
    }
    serchForm.reset();
  filmApiService.fetchArticles(1).then(r => {
    createPopularFilmsMarkup(r)
    const pagination = new Pagination('pagination', {
      totalItems: filmApiService.totalFilms,
      itemsPerPage: 20,
      centerAlign: true,
      visiblePages: 5,
    });
      pagination.on('beforeMove', function (e) {
        refs.spinner.classList.remove('is-hidden');
        const newPage = e.page;
        filmApiService.fetchArticles(newPage).then(r => {
          createPopularFilmsMarkup(r);
          refs.spinner.classList.add('is-hidden');
        });
      });
  });
}

// function fetchArticles() {
//   const refs = getRefs();
//   refs.spinner.classList.remove('is-hidden');
//   const filmsPopular = new FilmApiService();
//   filmsPopular
//     .fetchArticles(1)
//     .then(r => {
//       createPopularFilmsMarkup(r);
//       const pagination = new Pagination('pagination', {
//         totalItems: filmsPopular.totalFilms,
//         itemsPerPage: 20,
//         centerAlign: true,
//         visiblePages: 5,
//       });
//       pagination.on('beforeMove', function (e) {
//         refs.spinner.classList.remove('is-hidden');
//         const newPage = e.page;
//         filmsPopular.fetchArticles(newPage).then(r => {
//           createPopularFilmsMarkup(r);
//           refs.spinner.classList.add('is-hidden');
//         });
//       });
//       refs.spinner.classList.add('is-hidden');
//     })
//     .catch(console.log);
// }


function typeSomething() {
  Notiflix.Notify.info(`Please type something`);
}