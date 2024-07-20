// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_ECPmBmxPlkvjLNZOpI8IkIJkfRDQav0",
  authDomain: "blog-770c5.firebaseapp.com",
  projectId: "blog-770c5",
  storageBucket: "blog-770c5.appspot.com",
  messagingSenderId: "86638125688",
  appId: "1:86638125688:web:f2b224105ddb70ea6f838d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };