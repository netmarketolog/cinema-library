export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this._page = 1;
    this.totalFilms = null;
  }

  async fetchArticles(URL, search) {
    const API_KEY = '8fa17eefa9c2b424e1a30217c39bc412';
    const url = `https://api.themoviedb.org/${URL}?api_key=${API_KEY}&language=en-US&page=${
      this._page
    }${search ? `&query=${this.searchQuery}` : ''}&include_adult=false`;

    const r = await fetch(url);
    const data = await r.json();
    const films = await this.getArrayOfFilms(data);
    return films;
  }

  getArrayOfFilms(r) {
    this.totalFilms = r.total_results;
    return r.results;
  }

  get allFilms() {
    return this.totalFilms;
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
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
