// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzZfRjir4tTgcuzP3TNcuC4ZJ659uNo8w",
  authDomain: "neu-ojt-app.firebaseapp.com",
  projectId: "neu-ojt-app",
  storageBucket: "neu-ojt-app.appspot.com",
  messagingSenderId: "223645892470",
  appId: "1:223645892470:web:56ed0ebb691e405435c457",
  measurementId: "G-2X4CKC8DDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { app, analytics };
