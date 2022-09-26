const refs = {
    watchedBtn: document.querySelector('.watched'),
    queueBtn: document.querySelector('.queue')
}

refs.watchedBtn.addEventListener('click', onWatchedVideo);
refs.queueBtn.addEventListener('click', onQueueVideo);

function onWatchedVideo(e) {
    e.preventDefault()
}

function onQueueVideo(e) {
    e.preventDefault()
}

