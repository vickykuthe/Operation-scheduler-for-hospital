import { db } from "./firebase-config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

const surgeryTable = document.getElementById("surgeryTable");

onSnapshot(collection(db, "surgeries"), (snapshot) => {
    surgeryTable.innerHTML = ""; // Clear old data

    snapshot.forEach((doc) => {
        const data = doc.data();
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${data.patientName}</td>
            <td>${data.email}</td>
            <td>${data.doctorName}</td>
            <td>${data.otRoom}</td>
            <td>${data.date}</td>
            <td>${data.status}</td>
        `;
        surgeryTable.appendChild(row);
    });
});
