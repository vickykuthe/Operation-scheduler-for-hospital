
import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = "patient"; // Default role for new users

    try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullName,
            email,
            role
        });

        alert("Registration Successful! Redirecting to Login...");
        window.location.href = "login.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
});
