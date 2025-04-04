// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPYFY-fByLRmKDCPtHABDonaiC9XRBJ0o",
  authDomain: "eneriche-golden-tickets.firebaseapp.com",
  projectId: "eneriche-golden-tickets",
  storageBucket: "eneriche-golden-tickets.appspot.com",
  messagingSenderId: "483921906427",
  appId: "1:483921906427:web:6d5c2e89bb9dbddd12fe5e",
  measurementId: "G-2TMF9F0F02"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

