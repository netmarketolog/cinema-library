import filmsMarkup from "./libraryCard";
import getRefs from "../getRefs";
const refs = getRefs();


refs.watchedBtn.addEventListener('click', onWatchedVideo)

function fetcMuvie(id) {
    const API_KEY = '8fa17eefa9c2b424e1a30217c39bc412';
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    return fetch(url).then(response => {
        return response.json();
    })
        .then(data => {
            console.log(data);
            filmsMarkup(data)
        })
        .catch(error => {
            console.log(error);
        })
}

function onWatchedVideo() {
    const savedFilm = localStorage.getItem("settings");
    const parsedFilm = JSON.parse(savedFilm);
    const massmap = parsedFilm.map(muvieId => {
        fetcMuvie(muvieId);
        
    });
    
    
}
// function onmuvieVideo(data) {
//     console.log(data)
// }
        
// onmuvieVideo()