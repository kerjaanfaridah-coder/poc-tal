import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9KHKGVw2abj_tkAa_kiE1pwboZdJQwqo",
  authDomain: "talpoc-bb7b2.firebaseapp.com",
  databaseURL: "https://talpoc-bb7b2-default-rtdb.asia-souteast1.firebasedatabase.app",
  projectId: "talpoc-bb7b2",
  storageBucket: "talpoc-bb7b2.firebasestorage.app",
  messagingSenderId: "943737959780",
  appId: "1:943737959780:web:808d2aa17e35f43aa1f671"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
