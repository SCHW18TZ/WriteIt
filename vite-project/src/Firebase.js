// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC_ELsDWYnAmvbT8c0IasO4Vcsgtcs_qMQ",
  authDomain: "devbiome69.firebaseapp.com",
  projectId: "devbiome69",
  storageBucket: "devbiome69.appspot.com",
  messagingSenderId: "834974721118",
  appId: "1:834974721118:web:5b7593816ffebdd82d80cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
