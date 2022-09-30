export default function getRefs() {
  const refs = {
    popularFilmsList: document.querySelector('.container__main'),
    spinner: document.querySelector('.spinner'),
    modalEl: document.querySelector('.backdrop-film'),
    movieEl: document.querySelector('.card__item'),
    watchedBtn: document.querySelector('[data-action="watched"]'),
    queueBtn: document.querySelector('[data-action="queue"]'),
    modalRendEl: document.querySelector('.film__container'),
    body: document.querySelector('body'),
    modalTeamEl: document.querySelector ('.backdrop-team'),
    modalTeamOpenBtn: document.querySelector ('[data-action="team-open-modal"]'),
    modalTeamCloseBtn: document.querySelector ('[data-action="team-close-modal"]')
    modalTeamEl: document.querySelector('.backdrop-team'),
    modalTeamOpenBtn: document.querySelector('.footer__team'),
    paginationEl: document.querySelector('.pagination ul'),

  };
  return refs;
}
