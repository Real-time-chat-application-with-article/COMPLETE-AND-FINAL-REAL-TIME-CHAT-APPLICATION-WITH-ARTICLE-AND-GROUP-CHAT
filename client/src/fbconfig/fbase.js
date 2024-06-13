// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkcfRwUbkn63VjO2TKFvKhXVoS-DVgq8M",
  authDomain: "react-firebase-ccf3e.firebaseapp.com",
  projectId: "react-firebase-ccf3e",
  storageBucket: "react-firebase-ccf3e.appspot.com",
  messagingSenderId: "1716554590",
  appId: "1:1716554590:web:05004484f17f7518d45dcf",
  measurementId: "G-9R7GRDXBL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)