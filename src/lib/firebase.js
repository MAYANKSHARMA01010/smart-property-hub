// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9oFWw2gi159hOl328cA23B2C0bn-mkUs",
  authDomain: "samart-property-hub-69.firebaseapp.com",
  projectId: "samart-property-hub-69",
  storageBucket: "samart-property-hub-69.firebasestorage.app",
  messagingSenderId: "72940615049",
  appId: "1:72940615049:web:ee7a2e50bf8683c33b1d58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;