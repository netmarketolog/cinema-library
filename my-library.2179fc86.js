var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var d={id:e,exports:{}};return t[e]=d,a.call(d.exports,d,d.exports),d.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=a),a("lJ5oQ"),a("dpZmf");const d=(0,(r=a("1DTXP")).default)();function o(e){const t=e.genres.map((e=>e.name)).join(", ");d.popularFilmsList.insertAdjacentHTML("afterbegin",` <li class="card__item" id=${e.id}>\n        <a class="card__link" id="429473" href="#">\n          <img\n            src="https://image.tmdb.org/t/p/w500/${e.poster_path}"\n            alt="${e.original_title}"\n            class="card__poster"\n          />\n\n          <h2 class="card__title">${e.original_title}</h2>\n          <div class="card__wrap">\n            <p class="card__description">${t} | ${e.release_date.slice(0,4)}</p>\n            <p class="card__rating">${e.vote_average.toFixed(1)}</p>\n          </div>\n        </a>\n      </li>`)}var r=a("1DTXP"),c=a("fQE3M");c=a("fQE3M");a("3qt3Q");const i=(0,r.default)();i.watchedBtn.addEventListener("click",(function(){i.watchedBtn.setAttribute("disabled",!0),i.queueBtn.removeAttribute("disabled"),i.addToWatchedBtn.textContent="Remove from Watched",i.addToQueueBtn.textContent="Add to Queue";const e=localStorage.getItem("watched"),t=JSON.parse(e);document.querySelectorAll(".card__item").forEach((e=>{e.remove()})),t.map((e=>{o(e)}))})),i.queueBtn.addEventListener("click",(function(){i.queueBtn.setAttribute("disabled",!0),i.watchedBtn.removeAttribute("disabled"),i.addToWatchedBtn.textContent="Add to Watched",i.addToQueueBtn.textContent="Remove from Queue";const e=localStorage.getItem("queue"),t=JSON.parse(e);document.querySelectorAll(".card__item").forEach((e=>{e.remove()})),t.map((e=>{o(e)}))})),i.addToWatchedBtn.addEventListener("click",(function(){const e=document.querySelector(".film__poster");document.querySelectorAll(".card__item").forEach((t=>{if(e.id===t.id){t.remove(),(0,c.default)();const e=localStorage.getItem("queue");JSON.parse(e)}}))})),i.addToQueueBtn.addEventListener("click",(function(){const e=document.querySelector(".film__poster");document.querySelectorAll(".card__item").forEach((t=>{if(e.id===t.id){t.remove(),(0,c.default)();const e=localStorage.getItem("watched");JSON.parse(e)}}))})),a("fQE3M");
//# sourceMappingURL=my-library.2179fc86.js.map
