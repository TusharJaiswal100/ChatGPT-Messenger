import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJaJDShKfNaLBKt0KMdvtiOoiPhCzMuII",
  authDomain: "chatgpt-messanger-fdf56.firebaseapp.com",
  projectId: "chatgpt-messanger-fdf56",
  storageBucket: "chatgpt-messanger-fdf56.appspot.com",
  messagingSenderId: "1801322653",
  appId: "1:1801322653:web:da2a844e8988bd485fd474"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };