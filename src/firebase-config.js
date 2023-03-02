import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_8pGZeHKBrZFk1ZoCTsVrqHZKwEg4Zeo",
  authDomain: "simple-blog-31047.firebaseapp.com",
  projectId: "simple-blog-31047",
  storageBucket: "simple-blog-31047.appspot.com",
  messagingSenderId: "677346378495",
  appId: "1:677346378495:web:4af045ee6cf993f8f882ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
