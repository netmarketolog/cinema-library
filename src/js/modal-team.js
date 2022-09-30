import getRefs from './getRefs';

const refs = getRefs()

refs.modalTeamOpenBtn.addEventListener ('click', openModalTeam)
refs.modalTeamCloseBtn.addEventListener ('click', closeModalTeam)
refs.modalTeamEl.addEventListener ('click', onBackdropClick)

function closeModalTeam () {
  refs.modalTeamEl.classList.add ("is-hidden")
  document.body.classList.remove("no-scroll");
}
function openModalTeam (e) {
  e.preventDefault()
  refs.modalTeamEl.classList.remove ("is-hidden")
  document.body.classList.add('no-scroll');
}

function onBackdropClick (e) {
  console.log(e.target);
  console.log(e.currentTarget);
  if (e.currentTarget === e.target) {
     closeModalTeam();
}}

window.addEventListener ("keydown", (e) => {
  if (e.code === "Escape") {
    closeModalTeam()
  }
})


