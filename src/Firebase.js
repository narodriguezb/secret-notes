// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTYCWHKCBbdMyz5nhXUGjekBQ3xJGESQ8",
  authDomain: "react-app-notes-aplication.firebaseapp.com",
  projectId: "react-app-notes-aplication",
  storageBucket: "react-app-notes-aplication.appspot.com",
  messagingSenderId: "859826111088",
  appId: "1:859826111088:web:41461149084dccddbc6ab5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)