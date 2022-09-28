export default function getRefs() {
  const refs = {
    popularFilmsList: document.querySelector('.container__main'),
    spinner: document.querySelector('.spinner'),
    modalEl: document.querySelector('.backdrop-film'),
    movieEl: document.querySelector(".card__item"),
    modalRendEl: document.querySelector('.film__container'),
  };
  return refs;
}
