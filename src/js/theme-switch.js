const theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const toggleSwitch = document.querySelector('#theme-switch');
const body = document.querySelector('body');

defaultTheme();

toggleSwitch.addEventListener('change', onToggleSwitch);

function defaultTheme() {
  if (localStorage.getItem('THEME') === theme.DARK) {
    toggleSwitch.checked = true;
    classChange(theme.DARK, theme.LIGHT);
  } else {
    toggleSwitch.checked = false;
    classChange(theme.LIGHT, theme.DARK);
  }
}

function classChange(addClass, removeClass) {
  body.classList.add(addClass);
  body.classList.remove(removeClass);
  localStorage.setItem('THEME', addClass);
}

function onToggleSwitch(evt) {
  if (evt.target.checked) {
    classChange(theme.DARK, theme.LIGHT);
  } else {
    classChange(theme.LIGHT, theme.DARK);
  }
}
