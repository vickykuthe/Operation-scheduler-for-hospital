import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

const form = document.getElementById("addSurgeryForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const surgeryData = {
        patientName: document.getElementById("patientName").value,
        email: document.getElementById("email").value,
        doctorName: document.getElementById("doctorName").value,
        otRoom: document.getElementById("otRoom").value,
        date: document.getElementById("date").value,
        anesthesia: document.getElementById("anesthesia").value,
        status: "Scheduled",
        createdAt: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "surgeries"), surgeryData);
        alert("Surgery Scheduled Successfully");
        form.reset();
    } catch (error) {
        alert("Error adding surgery: " + error.message);
    }
});
