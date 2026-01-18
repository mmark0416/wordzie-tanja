import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA76WOP83smEGR_iJKTYW-y1mUgcSAIBTk",
  authDomain: "wordzie-tanja.firebaseapp.com",
  projectId: "wordzie-tanja",
  storageBucket: "wordzie-tanja.firebasestorage.app",
  messagingSenderId: "290004268055",
  appId: "1:290004268055:web:cd0b021f9b9ead22df1852",
  measurementId: "G-02471CWLED"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)