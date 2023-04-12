import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbJpVYHKAB9yNi6NRYhOctoT634-17KUQ",
  authDomain: "miniblog-5a76e.firebaseapp.com",
  projectId: "miniblog-5a76e",
  storageBucket: "miniblog-5a76e.appspot.com",
  messagingSenderId: "108593026556",
  appId: "1:108593026556:web:f7b14c6d3a29a40a8f0e79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// importando o fireStore do firebase
const db = getFirestore(app);

export { db };