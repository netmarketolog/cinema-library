const API_KEY = '8fa17eefa9c2b424e1a30217c39bc412';
const API_URL_MOVIE_DETAILS =
  "https://api.themoviedb.org/3/movie/157336?api_key={'8fa17eefa9c2b424e1a30217c39bc412'}&append_to_response=videos";
import getRefs from './getRefs';

// Modal
const refs = getRefs();

refs.popularFilmsList.addEventListener('click', e => {
  e.preventDefault();
  console.dir(e.target);
  const isCardMovie = e.target.closest('.card__item');
  if (!isCardMovie) {
    return;
  }

  openModal();

  refs.popularFilmsList.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

async function openModal() {
  // console.log(id);
  // const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-API-KEY": API_KEY,
  //   },
  // });
  // const respData = await resp.json();

  refs.modalEl.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');

  refs.modalRendEl.innerHTML = `<div class="film__poster">
        <img
          src="https://image.tmdb.org/t/p/w500//tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg"
          alt=""
          loading="lazy"
          class="film__img"
        />
      </div>
      <div class="film__info">
        <h2 class="film__title">A FISTFUL OF LEAD</h2>
        <div class="film__description">
          <table>
            <tbody>
              <tr>
                <th class="film__attribute">Vote / Votes</th>
                <td class="film__att-value">
                  <span class="film__vote">7.3</span> /
                  <span class="film__votes">1260</span>
                </td>
              </tr>
              <tr>
                <th class="film__attribute">Popularity</th>
                <td class="film__att-value">100.2</td>
              </tr>
              <tr>
                <th class="film__attribute">Original Title</th>
                <td class="film__att-value">A FISTFUL OF LEAD</td>
              </tr>
              <tr>
                <th class="film__attribute">Genre</th>
                <td class="film__att-value">Western</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="film__about">
          <h3 class="film__about-title">About</h3>
          <p class="film__text">
            Four of the West’s most infamous outlaws assemble to steal a huge
            stash of gold from the most corrupt settlement of the gold rush
            towns. But not all goes to plan one is killed and the other three
            escapes with bags of gold hide out in the abandoned gold mine where
            they happen across another gang of three – who themselves were
            planning to hit the very same bank! As tensions rise, things go from
            bad to worse as they realise the bags of gold are filled with
            lead... they’ve been double crossed – but by who and how?
          </p>
        </div>`;
  const btnClose = document.querySelector('.modal-film__close-btn');
  btnClose.addEventListener('click', () => closeModal());
}

function closeModal() {
  refs.modalEl.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
}

//close
window.addEventListener('click', e => {
  if (e.target === refs.modalEl) {
    closeModal();
  }
});
