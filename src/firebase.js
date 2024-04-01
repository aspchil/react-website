// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwhzUABSAMc2HLSIMqwQnXoymn4p4DEeo",
  authDomain: "docs-cln.firebaseapp.com",
  projectId: "docs-cln",
  storageBucket: "docs-cln.appspot.com",
  messagingSenderId: "1034766828348",
  appId: "1:1034766828348:web:21f2b42f821bb9b49c1439",
  measurementId: "G-9JMYMKPMF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestore = getFirestore(app)
export const storage = getStorage(app);