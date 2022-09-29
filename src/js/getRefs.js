export default function getRefs() {
  const refs = {
    popularFilmsList: document.querySelector('.container__main'),
    spinner: document.querySelector('.spinner'),
    modalEl: document.querySelector('.backdrop-film'),
    movieEl: document.querySelector(".card__item"),
    watchedBtn: document.querySelector('[data-action="watched"]'),
    queueBtn: document.querySelector('[data-action="queue"]'),
  };
  return refs;
}
