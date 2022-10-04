const API_KEY = '8fa17eefa9c2b424e1a30217c39bc412';
const trailerBackdrop = document.querySelector('.backdrop-trailer');

async function getTrailers(id) {
  const URL = 'https://api.themoviedb.org/3/movie/';
  const response = await fetch(
    `${URL}${id}/videos?api_key=${API_KEY}&language=en-US`
  );
  const trailers = await response.json();
  return trailers.results;
}

export async function watchTrailer() {
  const id = document.querySelector('.film__poster').id;
  const fetchResult = await getTrailers(id);
  // console.log(fetchResult);
  trailerBackdrop.classList.remove('is-hidden');
  if (fetchResult.length === 0) {
    trailerBackdrop.insertAdjacentHTML(
      'afterbegin',
      '<div class="">заглушка</div>'
    );
    return;
  }

  let trailerKey = fetchResult.find(
    item => item.name.includes('official') || item.name.includes('Official')
    // item => item.type === 'Trailer' && item.site === 'YouTube'
  ).key;
  // console.log(trailerKey);
  // const modalTrailer = document.querySelector('.modal-trailer');

  trailerBackdrop.innerHTML = createTrailerModalMarkup(trailerKey);
  // modalTrailer.innerHTML = createTrailerModalMarkup(trailerKey);
}

function createTrailerModalMarkup(trailerKey) {
  return `<iframe width="640" height="360" 
  src="https://www.youtube.com/embed/${trailerKey}"
  title="YouTube video player" frameborder="0"
  allow="accelerometer; autoplay; clipboard-write;
  encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>`;
}

function closeModalTrailer() {
  trailerBackdrop.classList.add('is-hidden');
}

trailerBackdrop.addEventListener('click', onBackdropTrailerClick);
function onBackdropTrailerClick(evt) {
  if (evt.currentTarget === evt.target) {
    closeModalTrailer();
  }
  trailerBackdrop.innerHTML = '';
  // trailerBackdrop.removeEventListener('click', watchTrailer);
}

window.addEventListener('keydown', evt => {
  if (evt.code === 'Escape') {
    closeModalTrailer();
  }
});
