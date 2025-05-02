
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCYH53rAFfw49HTzN8Mv_5G8c1nN7C6a7g",
    authDomain: "doctors-care-9d909.firebaseapp.com",
    projectId: "doctors-care-9d909",
    storageBucket: "doctors-care-9d909.firebasestorage.app",
    messagingSenderId: "572771232720",
    appId: "1:572771232720:web:57dd60398251658f8467d5",
    measurementId: "G-T9D36NFRV1"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
