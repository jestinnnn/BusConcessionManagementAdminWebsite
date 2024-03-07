import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC6lEnmK5EjINyRxwOynZp08N85W7kyXVw",
    authDomain: "busapp-6cd14.firebaseapp.com",
    projectId: "busapp-6cd14",
    storageBucket: "busapp-6cd14.appspot.com",
    messagingSenderId: "263338764613",
    appId: "1:263338764613:web:202d186b5f868c959f362c",
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth();
  export const db =getFirestore(app);