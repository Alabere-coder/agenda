// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMYCTkC0agZ8O1QZrVgkvUXpfdofEskRM",
  authDomain: "agenda-app-803f6.firebaseapp.com",
  projectId: "agenda-app-803f6",
  storageBucket: "agenda-app-803f6.firebasestorage.app",
  messagingSenderId: "921551892525",
  appId: "1:921551892525:web:9e27fbbb442af136dd08a4",
  measurementId: "G-BJMRBHRGBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)