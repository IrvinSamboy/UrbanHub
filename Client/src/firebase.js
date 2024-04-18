// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "urbanhub-bd3cc.firebaseapp.com",
  projectId: "urbanhub-bd3cc",
  storageBucket: "urbanhub-bd3cc.appspot.com",
  messagingSenderId: "633554530413",
  appId: "1:633554530413:web:aa4e9c5285e5a9778dcf64"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)