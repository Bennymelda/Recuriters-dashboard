// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhIVfUYyztQQQu1-0WEPYzcZ2tFmM4Slw",
  authDomain: "seamless-6d5b8.firebaseapp.com",
  projectId: "seamless-6d5b8",
  storageBucket: "seamless-6d5b8.firebasestorage.app",
  messagingSenderId: "561801833366",
  appId: "1:561801833366:web:a29b0bce95413614f14bb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);