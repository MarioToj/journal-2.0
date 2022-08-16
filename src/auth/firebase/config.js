// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkitkMmWjuS0ymyqz0gdfEFgVkJp1PD8Q",
  authDomain: "react-curso-7a407.firebaseapp.com",
  projectId: "react-curso-7a407",
  storageBucket: "react-curso-7a407.appspot.com",
  messagingSenderId: "717214133094",
  appId: "1:717214133094:web:9fe97813a1b875c58876a7"
};

// Initialize Firebase
export const Firebaseapp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(Firebaseapp);

export const FirebaseDB = getFirestore(Firebaseapp);
