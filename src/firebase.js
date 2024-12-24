// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBClk98a448aOwGkRDaNGE4-18f0e-qA14",
  authDomain: "icn-australia.firebaseapp.com",
  projectId: "icn-australia",
  storageBucket: "icn-australia.firebasestorage.app",
  messagingSenderId: "327604077284",
  appId: "1:327604077284:web:3795fbe950bf741306e2f1",
  measurementId: "G-W804B1YDZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };