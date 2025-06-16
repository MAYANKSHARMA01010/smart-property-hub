import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9oFWw2gi159hOl328cA23B2C0bn-mkUs",
  authDomain: "samart-property-hub-69.firebaseapp.com",
  projectId: "samart-property-hub-69",
  storageBucket: "samart-property-hub-69.appspot.com",
  messagingSenderId: "72940615049",
  appId: "1:72940615049:web:ee7a2e50bf8683c33b1d58"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;