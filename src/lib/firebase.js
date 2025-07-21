import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC9oFWw2gi159hOl328cA23B2C0bn-mkUs",
  authDomain: "smart-property-hub-69.firebaseapp.com",
  projectId: "smart-property-hub-69",
  storageBucket: "smart-property-hub-69.appspot.com",
  messagingSenderId: "72940615049",
  appId: "1:72940615049:web:ee7a2e50bf8683c33b1d58",
};

// Ensure Firebase is initialized only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let db;
try {
  if (!globalThis._firebaseDb) {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache(),
    });
    globalThis._firebaseDb = db;
  } else {
    db = globalThis._firebaseDb;
  }
} catch (e) {
  db = getFirestore(app);
}

// Other Firebase services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const Recaptcha = RecaptchaVerifier;
const storage = getStorage(app);

// Export everything
export { app, auth, db, googleProvider, RecaptchaVerifier, Recaptcha, storage };
