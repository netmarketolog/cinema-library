import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/src/styles/main.scss';
import getRefs from './getRefs';

const firebaseConfig = {
  apiKey: 'AIzaSyAHTtEL2nBzqZNpHY9emF6pa0VIqEGzIM0',
  authDomain: 'filmoteka-9db0e.firebaseapp.com',
  databaseURL:
    'https://filmoteka-9db0e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-9db0e',
  storageBucket: 'filmoteka-9db0e.appspot.com',
  messagingSenderId: '855852691489',
  appId: '1:855852691489:web:d26ad7b621911b2f607360',
  measurementId: 'G-5TNP45QRYB',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerFb = new FacebookAuthProvider();
const providerGithub = new GithubAuthProvider();
const db = getDatabase();

const refs = getRefs();
refs.logoutBtn.style.display = 'none';

const instance = basicLightbox.create(
  `
  <div class="modal-auth">
    <div class="modal-auth-container">
      <div class="login-signup-container">
        <h3 class="auth-container-title" data-key="form-name">Log in</h3>
        <button id="openSignUpModalBtn" class="sign-up-btn" data-key="sign-up">Sign up</button>
      </div>
      <button type="button" id="close-modal-btn">
        <svg width="14" height="14">
        <use href="sprite.4816ad45.svg#icon-close"></use>
      </svg>
      </button>
        <p class="auth-container-text" data-key="description">Enter your email address and password to log in</p>
        <input type="email" placeholder="E-mail" class="email-input" id="login-email" data-key="email">
        <input type="password" placeholder="Password" class="passw-input" id="login-password" data-key="password">
        <button class="login-btn" id="loginBtn" data-key="modal-login">Log in</button>
        <p class="auth-google-text" data-key="authorization">Authorization with social networks</p>
        <div class="auth-social">
          <ul class="social-list">
            <li class="social-items">
              <a id="login-google" class="social-login-btn">
                <svg width="25" height="25">
                  <use href="sprite.4816ad45.svg#icon-google"></use>
                </svg>
              </a>
            </li>
            <li class="social-items">
              <a id="login-fb" class="social-login-btn fb-btn">
                <svg width="25" height="25">
                  <use href="/Test/sprite.4816ad45.svg#facebook"></use>
                </svg>
              </a>
            </li>
            <li class="social-items">
              <a id="login-github" class="social-login-btn git-btn">
                <svg width="25" height="25">
                  <use href="sprite.4816ad45.svg#icon-github"</use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
  </div>
`,
  {
    onShow: instance => {
      instance.element().querySelector('#close-modal-btn').onclick =
        instance.close;
    },
  }
);

const instance2 = basicLightbox.create(
  `
  <div class="modal">
  <div class="modal-auth-container">
    <div class="login-signup-container">
      <h3 class="auth-container-title" data-key="sign-up">Sign up</h3>
      <button id="alreadyHaveAccount" class="login-up-btn" data-key="form-name">Log in</button>
    </div>
      <button type="button" id="close-modal-btn">
        <svg width="14" height="14">
        <use href="sprite.4816ad45.svg#icon-close"></use>
      </svg>
      </button>
      <p class="auth-container-text" data-key="description">Enter your email address and password to sign up</p>
        <input type="email" placeholder="E-mail" class="email-input sign-up" id="sign-email" data-key="email">
        <input type="password" placeholder="Password" class="passw-input" id="sign-password" data-key="password">
    <button class="login-btn" id="signUp" data-key="sign-up-btn">Sign up</button>
  </div>
</div>
`,
  {
    onShow: instance => {
      instance.element().querySelector('#close-modal-btn').onclick =
        instance.close;
    },
  }
);

refs.openSignInModalBtn.addEventListener('click', openSigInModal);
refs.logoutBtn.addEventListener('click', logOutUser);

function openSigInModal() {
  instance2.close();
  instance.show();
  const openSignUpModalBtn = document.querySelector('#openSignUpModalBtn');
  openSignUpModalBtn.addEventListener('click', openSignUpModal);

  const loginBtn = document.querySelector('#loginBtn');
  loginBtn.addEventListener('click', loginUser);

  const loginGoogle = document.querySelector('#login-google');
  loginGoogle.addEventListener('click', loginWithGoogle);

  const loginFb = document.querySelector('#login-fb');
  loginFb.addEventListener('click', loginWithFacebook);

  const loginGithub = document.querySelector('#login-github');
  loginGithub.addEventListener('click', loginWithGithub);
}

function openSignUpModal() {
  instance.close();
  instance2.show();
  const alreadyHaveAccount = document.querySelector('#alreadyHaveAccount');
  alreadyHaveAccount.addEventListener('click', openSigInModal);

  const signUpBtn = document.querySelector('#signUp');
  signUpBtn.addEventListener('click', signUpUser);
}

function signUpUser() {
  let email = document.getElementById('sign-email').value;
  let password = document.getElementById('sign-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      Notify.success(`User created`, { position: 'center-top' });
      instance2.close();
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong!', { position: 'center-top' });
      console.log(error);
    });
}

function loginUser() {
  let email = document.getElementById('login-email').value;
  let password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      Notify.success(`User logged`, { position: 'center-top' });
      instance.close();
    })
    .catch(error => {
      Notify.failure('Wrong username or password', { position: 'center-top' });
      console.log(error);
    });
}

function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then(result => {
      showUserDetails(result.user);
      instance.close();
      Notify.success('User logged in with Google', { position: 'center-top' });
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong!', { position: 'center-top' });
      console.log(error);
    });
}

function loginWithFacebook() {
  signInWithPopup(auth, providerFb)
    .then(result => {
      showUserDetails(result.user);
      instance.close();
      Notify.success('User logged in with Facebook', {
        position: 'center-top',
      });
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong!', { position: 'center-top' });
      console.log(error);
    });
}

function loginWithGithub() {
  signInWithPopup(auth, providerGithub)
    .then(result => {
      showUserDetails(result.user);
      instance.close();
      Notify.success('User logged in with Github', { position: 'center-top' });
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong!', { position: 'center-top' });
      console.log(error);
    });
}

function logOutUser() {
  signOut(auth)
    .then(() => {
      Notify.success('User logged out', { position: 'center-top' });
      refs.loginUserDetails.innerHTML = '';
      refs.openSignInModalBtn.style.display = 'block';
      refs.logoutBtn.style.display = 'none';
      location.reload();
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong!', { position: 'center-top' });
      console.log(error);
    });
}

function showUserDetails(user) {
  if (user.photoURL) {
    refs.loginUserDetails.innerHTML = `
  <img class="user-img" src="${user.photoURL}" width=20"px">
  <p class="user-name">${user.displayName}</p>`;
  } else {
    refs.loginUserDetails.innerHTML = `<p class="user-email">${user.email}</p>`;
  }
}

onAuthStateChanged(auth, user => {
  const libraryBtn = document.querySelector('.library');
  // const user = auth.currentUser;
  if (user) {
    libraryBtn.classList.remove('visually-hidden');
    showUserDetails(user);
    const userId = user.uid;
    refs.openSignInModalBtn.style.display = 'none';
    refs.logoutBtn.style.display = 'block';
    const { displayName, email, uid, photoURL } = user;
    writeUserData(displayName, email, uid, photoURL);
    readUserData(auth);
  } else {
    libraryBtn.classList.add('visually-hidden');
  }
});

function writeUserData(uid, displayName, email, photoURL) {
  set(ref(db, 'users/' + uid), {
    Name: displayName,
    Email: email,
    photo: photoURL,
  });
}

function readUserData(auth) {
  const userId = auth.currentUser.uid;
  return onValue(ref(db, '/users/' + userId), snapshot => {}, {
    onlyOnce: true,
  });
}
