// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


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

// Initialize Firebase Authentication and Analytics
const auth = getAuth(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Set Firebase session persistence so that it persists between page reloads
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence set to browser session.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error.message);
  });

// Initialize GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Export Firebase app, auth, analytics, and googleProvider for usage
export { app, auth, analytics, googleProvider };

export const storage = getStorage(app, "https://console.firebase.google.com/u/0/project/neu-ojt-app/storage/neu-ojt-app.appspot.com/files");
