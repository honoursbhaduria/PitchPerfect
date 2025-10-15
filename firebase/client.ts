// Import the functions you need from the SDKs you need
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         