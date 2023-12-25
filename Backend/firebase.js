// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAH6Bpw3KnSnqHhRFKpmRZYtbOmSf6j8Vs",
  authDomain: "giftedbraintutbackend.firebaseapp.com",
  projectId: "giftedbraintutbackend",
  storageBucket: "giftedbraintutbackend.appspot.com",
  messagingSenderId: "290203043291",
  appId: "1:290203043291:web:5881fe84b8cb9bf34ad3fe",
  measurementId: "G-K1NF5Y8K7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);