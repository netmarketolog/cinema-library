import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class FilmApiService {
  constructor() {
    this.searchQuery = ``;
    this.page = 1;
    this.totalFilms = null;
  }

  async fetchArticles(page) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=8fa17eefa9c2b424e1a30217c39bc412&language=en-US&page=${page}&query=${this.searchQuery}&include_adult=false`
    );
    const data = await response.json();
    const films = await this.getArrayOfFilms(data);
    return films;
  }

  getArrayOfFilms(r) {
    console.log(r);
    if (r.total_results === 0) {
      return Notify.failure(
        'Search result not succsessful. Enter the correct movie name and try again!'
      );
    }
    this.totalFilms = r.total_results;
    // console.log(r.results)
    return r.results;
  }

  resetPage() {
    this.page = 1;
    this.totalPages = null;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
