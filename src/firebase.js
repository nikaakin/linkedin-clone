// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGIyMQwd9DYSOmGlyPmA8WuzKWi08sXM0",
  authDomain: "linkedin-clone-79c77.firebaseapp.com",
  projectId: "linkedin-clone-79c77",
  storageBucket: "linkedin-clone-79c77.appspot.com",
  messagingSenderId: "617737398254",
  appId: "1:617737398254:web:0dbb598bd08807013550ff",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
