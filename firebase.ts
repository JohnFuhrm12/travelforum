// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

// Initialize Firebase Database
firebase.initializeApp({
  apiKey: "AIzaSyDmwcKGeUINUH4O3Kh184B0AzegdPAHCKM",
  authDomain: "travelforum-a3d99.firebaseapp.com",
  projectId: "travelforum-a3d99",
  storageBucket: "travelforum-a3d99.appspot.com",
  messagingSenderId: "939616728325",
  appId: "1:939616728325:web:17934571bc094f7858f36c"
});

// Firebase Database
const db = firebase.firestore();

export { db };