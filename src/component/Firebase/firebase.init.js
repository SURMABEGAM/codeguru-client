// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhAAiwKBQK7BmBto-k7vv3Bk_-N8kAOTE",
  authDomain: "code--guru.firebaseapp.com",
  projectId: "code--guru",
  storageBucket: "code--guru.firebasestorage.app",
  messagingSenderId: "722990572054",
  appId: "1:722990572054:web:3dfce86c2a468eb5e0cb37"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app);