import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

// Fetch and display doctors
async function fetchDoctors() {
    const querySnapshot = await getDocs(collection(db, "doctors"));
    const doctorsContainer = document.getElementById("doctorsContainer");
    
    doctorsContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const doctorCard = `
            <div class="doctor-card">
                <img src="${data.image}" alt="${data.name}">
                <h3>${data.name}</h3>
                <p>${data.specialty}</p>
            </div>`;
        doctorsContainer.innerHTML += doctorCard;
    });
}

// Fetch and display services
async function fetchServices() {
    const querySnapshot = await getDocs(collection(db, "services"));
    const servicesContainer = document.getElementById("servicesContainer");

    servicesContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const serviceCard = `
            <div class="service-card">
                <h3>${data.name}</h3>
                <p>${data.description}</p>
            </div>`;
        servicesContainer.innerHTML += serviceCard;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchDoctors();
    fetchServices();
});
