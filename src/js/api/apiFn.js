export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    // this.totalPages = null;
  }

  async fetchArticles() {
    const API_KEY = '8fa17eefa9c2b424e1a30217c39bc412';
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${this.page}`;

    const r = await fetch(url);
    const data = await r.json();
    const films = await this.getArrayOfFilms(data);
    return films;
  }

  getArrayOfFilms(r) {
    // console.log(r.results);
    return r.results;
  }

  //   resetPage() {
  //     this.page = 1;
  //     this.totalPages = null;
  //   }

  //   get query() {
  //     return this.searchQuery;
  //   }

  //   set query(newQuery) {
  //     this.searchQuery = newQuery;
  //   }
}
