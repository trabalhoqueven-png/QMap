import { db } from "./firebase.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const map = L.map('map').setView([-23.5505, -46.6333], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

const marker = L.marker([-23.5505, -46.6333]).addTo(map);

// IMEI de teste
const imei = "359881234567890";

onSnapshot(doc(db, "localizacoes", imei), (docSnap) => {
  if (docSnap.exists()) {
    const { lat, lng } = docSnap.data();
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng]);
  }
});
