import getRefs from './getRefs';

const refs = getRefs()

refs.modalTeamEl.addEventListener ('click', closeModalTeam)
refs.modalTeamOpenBtn.addEventListener ('click', openModalTeam)

function closeModalTeam () {
  refs.modalTeamEl.classList.add ("is-hidden")
}
function openModalTeam (e) {
  e.preventDefault()
  refs.modalTeamEl.classList.remove ("is-hidden")
}

window.addEventListener ("keydown", (e) => {
  if (e.code === "Escape") {
    closeModalTeam()
  }
})

