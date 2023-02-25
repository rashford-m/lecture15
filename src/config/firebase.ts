// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwn2xPuGExvdUndD74oWSlzr_yid37q3E",
  authDomain: "react-course-2d142.firebaseapp.com",
  projectId: "react-course-2d142",
  storageBucket: "react-course-2d142.appspot.com",
  messagingSenderId: "110511900836",
  appId: "1:110511900836:web:03e7d4a94748d492127e31",
  measurementId: "G-1THX24YB4E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
