// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import "./js/getRefs"
import fetchPopularFilms from './js/api/fetchPopularFilms';

fetchPopularFilms();
// const container = document.getElementById('pagination');

import './js/theme-switch';
import './js/search-by-name/searchName';

import './js/modal-film';
import './js/modal-team';
import './js/local-storage/addToLStorage';

import './js/scroll-to-top';
const settings = [616037, 301502, 532639]

localStorage.setItem("settings", JSON.stringify(settings));


const queuesettings = [718930, 642885, 985939]

localStorage.setItem("queuesettings", JSON.stringify(queuesettings));