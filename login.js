import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCYH53rAFfw49HTzN8Mv_5G8c1nN7C6a7g",
    authDomain: "doctors-care-9d909.firebaseapp.com",
    projectId: "doctors-care-9d909",
    storageBucket: "doctors-care-9d909.firebasestorage.app",
    messagingSenderId: "572771232720",
    appId: "1:572771232720:web:57dd60398251658f8467d5",
    measurementId: "G-T9D36NFRV1"
  };
  
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!role) {
        alert("Please select your role.");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get role from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();

            if (userData.role !== role) {
                alert(`You are not registered as ${role}. Please select correct role.`);
                return;
            }
            localStorage.setItem("user", JSON.stringify({ email: userCredential.user.email }));


            if (role === "admin") {
                window.location.href = "admin-dashboard.html";
            } else if (role === "patient") {
                window.location.href = "patient-dashboard.html";
            }
        } else {
            alert("User data not found in database.");
        }
    } catch (error) {
        alert("Login failed: " + error.message);
    }
});
