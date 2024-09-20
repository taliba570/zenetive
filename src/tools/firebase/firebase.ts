// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgnTtSfhohkqK8sb98F9b72KRVuPLqJ7w",
  authDomain: "pomodoro-tracker-35c6d.firebaseapp.com",
  projectId: "pomodoro-tracker-35c6d",
  storageBucket: "pomodoro-tracker-35c6d.appspot.com",
  messagingSenderId: "306170685493",
  appId: "1:306170685493:web:6e2c8834b8769c906d697c",
  measurementId: "G-PJN6QB8VS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);