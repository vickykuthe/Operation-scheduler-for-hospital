import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYH53rAFfw49HTzN8Mv_5G8c1nN7C6a7g",
  authDomain: "doctors-care-9d909.firebaseapp.com",
  projectId: "doctors-care-9d909",
  storageBucket: "doctors-care-9d909.appspot.com",
  messagingSenderId: "572771232720",
  appId: "1:572771232720:web:57dd60398251658f8467d5",
  measurementId: "G-T9D36NFRV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔁 Wait for DOM to load before running main logic
window.addEventListener("DOMContentLoaded", async () => {
  const operationTable = document.getElementById("operationTable");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!operationTable || !logoutBtn) {
    console.error("HTML elements not found. Ensure 'operationTable' and 'logoutBtn' exist in your HTML.");
    return;
  }
  console.log("Reading user from localStorage...");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User object from localStorage:", user);
  
  const email = user?.email;
  console.log("Email being used for Firestore query:", email);
  

  console.log("User data from local storage:", user);

  if (!email) {
    alert("User not logged in");
    window.location.href = "index.html";
    return;
  }
  await loadOperations("ramesh@gmail.com", operationTable);

  // await loadOperations(email, operationTable);

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
});

// 💾 Load surgeries for current patient
async function loadOperations(email, operationTable) {
  try {
    const q = query(collection(db, "surgeries"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      operationTable.innerHTML = "<tr><td colspan='4'>No surgeries found.</td></tr>";
      return;
    }

    console.log("Query snapshot:", querySnapshot.docs.map(doc => doc.data()));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.doctorName || "-"}</td>
        <td>${data.anesthesia || "-"}</td>
        <td>${data.date || "-"}</td>
        <td>${data.status || "Pending"}</td>
      `;
      operationTable.appendChild(row);
    });
  } 
   catch (error) {
    console.error("Error loading surgeries:", error);
    operationTable.innerHTML = `
      <tr><td colspan='4'>⚠️ Failed to load surgeries. Check console for details.</td></tr>`;
  }
  
}

