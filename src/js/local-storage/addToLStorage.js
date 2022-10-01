 
const KEY_QUEUE = 'local';

let local = {
  queueList: [],
  watchedList: [],
};

// Функція для роботи зі сховищем
// Функція додавання фільмів до черги
function onQueueBtn(film) {
  if (local.queueList.find(queueList => queueList.id === film.id)) {
    return;
  } else {
    local.queueList.push(film);
  }
  localStorage.setItem(KEY_QUEUE, JSON.stringify(local));
}
// Функція додавання переглянутих фільмів
function onWatchedBtn(id) {
  local = JSON.parse(localStorage.getItem(KEY_QUEUE));
  local.queueList.map(film => {
    if (id === film.id) {
      local.watchedList.push(film);
      const indexId = local.queueList.indexOf(film);
      local.queueList.splice(indexId, 1);
    }
  });
  localStorage.setItem(KEY_QUEUE, JSON.stringify(local));
}

export { onQueueBtn, onWatchedBtn };
