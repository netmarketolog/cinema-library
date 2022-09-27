export default class NewApiService {
  constructor() {
    // this.searchQuery = '';
    this.page = 1;
    this.totalFilms = null;
  }

  async fetchArticles(page) {
    const API_KEY = '8fa17eefa9c2b424e1a30217c39bc412';
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`;

    const r = await fetch(url);
    const data = await r.json();
    const films = await this.getArrayOfFilms(data);
    return films;
  }

  getArrayOfFilms(r) {
    this.totalFilms = r.total_results;
    return r.results;
  }

  // get page() {
  //   return this.page;
  // }

  // set page(newPage) {
  //   this.page = newPage;
  // }
}
