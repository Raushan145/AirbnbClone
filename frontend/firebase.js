// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "food-delivery-9695f.firebaseapp.com",
  projectId: "food-delivery-9695f",
  storageBucket: "food-delivery-9695f.firebasestorage.app",
  messagingSenderId: "618533649893",
  appId: "1:618533649893:web:7f9106e8859b7e8afb030c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


 const auth = getAuth();

 export {app, auth};