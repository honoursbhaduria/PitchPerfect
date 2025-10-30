import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBogPE1y0_RailcPp1nCjrSNDE-vf-r1_Q",
  authDomain: "pitchperfect-0001.firebaseapp.com",
  projectId: "pitchperfect-0001",
  storageBucket: "pitchperfect-0001.firebasestorage.app",
  messagingSenderId: "611258324163",
  appId: "1:611258324163:web:2c6efb9f61b1a8e98ffe76",
  measurementId: "G-WXMN4CNXK0"
};

// Initialize Firebase (only initialize if no apps exist)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const  db = getFirestore(app);