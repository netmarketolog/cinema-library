import getRefs from '../getRefs';
const refs = getRefs();
export default function filmsMarkup(film) { 
    console.log(film)
    refs.popularFilmsList.insertAdjacentHTML(
            'afterbegin',
            `<li class="card__item" id=${film.id}>
        <a class="card__link" id="429473" href="#">
          <img
            src="https://image.tmdb.org/t/p/w500/${film.poster_path}"
            alt="{$}{film.original_title}"
            class="card__poster"
          />

          <h2 class="card__title">${film.original_title}</h2>
          <div class="card__wrap">
            <p class="card__description">{$}{genres} | ${film.release_date.slice(
                0,
                4
            )}</p>
            <p class="card__rating"></p>${film.vote_average.toFixed(1)}</p>
          </div>
        </a>
      </li>`
        );
    }
//     return film.map(({ id, poster_path, original_title, release_date, vote_average }) => {
//         refs.popularFilmsList.insertAdjacentHTML(
//             'afterbegin',
//             `<li class="card__item" id=${id}>
//         <a class="card__link" id="429473" href="#">
//           <img
//             src="https://image.tmdb.org/t/p/w500/${poster_path}"
//             alt="{$}{film.original_title}"
//             class="card__poster"
//           />

//           <h2 class="card__title">${original_title}</h2>
//           <div class="card__wrap">
//             <p class="card__description">{$}{genres} | ${release_date.slice(
//                 0,
//                 4
//             )}</p>
//             <p class="card__rating"></p>${vote_average.toFixed(1)}</p>
//           </div>
//         </a>
//       </li>`
//         );
//     }).join('');
// }