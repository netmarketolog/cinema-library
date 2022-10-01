import filmsMarkup from "./libraryCard";
import getRefs from "../getRefs";
const refs = getRefs();

refs.watchedBtn.addEventListener('click', onWatchedVideo);
refs.queueBtn.addEventListener('click', onQueueVideo);

function fetcMuvie(id) {
    const API_KEY = '8fa17eefa9c2b424e1a30217c39bc412';
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    return fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            filmsMarkup(data)
        })
        .catch(error => {
            console.log(error);
        })
}

function onWatchedVideo() {
    refs.watchedBtn.setAttribute('disabled', true);
    refs.queueBtn.removeAttribute('disabled');

    const savedFilm = localStorage.getItem("watched");
    const parsedFilm = JSON.parse(savedFilm);
    
    onRemoveQueue()
    // onBtnCustomWatched()

    parsedFilm.map(muvieId => {
        filmsMarkup(muvieId);
    });  
};

function onQueueVideo() {
    refs.queueBtn.setAttribute('disabled', true);
    refs.watchedBtn.removeAttribute('disabled');
    
    const savedFilm = localStorage.getItem("queue");
    const parsedFilm = JSON.parse(savedFilm);

    onRemoveWatched()
    // onBtnCustomQueue()

    parsedFilm.map(muvieId => {
        filmsMarkup(muvieId);
    });
    
}

function onRemoveWatched() {
    const remuve = document.querySelectorAll('.card__item')
    remuve.forEach(li => {
        li.remove()
    });
}

function onRemoveQueue() {
    const remuve = document.querySelectorAll('.card__item')
    remuve.forEach(li => {
        li.remove()
    });
}   
