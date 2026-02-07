import { auth, db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔒 GARANTIR USUÁRIO LOGADO
auth.onAuthStateChanged(user => {
  if (!user) {
    location.href = "index.html";
    return;
  }

  iniciarMapa(user.uid);
});

function iniciarMapa(uid) {
  const map = L.map("map").setView([-23.55, -46.63], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
  }).addTo(map);

  // Aqui entra rastreamento em tempo real
}

onSnapshot(doc(db, "localizacoes", imei), (docSnap) => {
  if (docSnap.exists()) {
    const { lat, lng } = docSnap.data();
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng]);
  }
});
