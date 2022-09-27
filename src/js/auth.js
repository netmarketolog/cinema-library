import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAHTtEL2nBzqZNpHY9emF6pa0VIqEGzIM0',
  authDomain: 'filmoteka-9db0e.firebaseapp.com',
  projectId: 'filmoteka-9db0e',
  storageBucket: 'filmoteka-9db0e.appspot.com',
  messagingSenderId: '855852691489',
  appId: '1:855852691489:web:d26ad7b621911b2f607360',
  measurementId: 'G-5TNP45QRYB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  // регаю юзера, якщо забуду : https://www.youtube.com/watch?v=wkdCpktUfGg&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=5

  auth.createUserwithEmailAndPassword(email, password).then(cred => {
    console.log(cred);
  });
});
