import { db } from "./firebase.js";
import { collection,
  addDoc,
  query,
  where, 
  doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const map = L.map('map').setView([-23.5505, -46.6333], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

const markers = {};

// ELEMENTOS
const modal = document.getElementById("modal");
const btnAdd = document.getElementById("btnAdd");
const fechar = document.getElementById("fechar");
const salvar = document.getElementById("salvar");

// MODAL
btnAdd.onclick = () => modal.classList.remove("hidden");
fechar.onclick = () => modal.classList.add("hidden");

// SALVAR DISPOSITIVO
salvar.onclick = async () => {
  const imei = document.getElementById("imei").value;
  const nome = document.getElementById("nome").value;
  const placa = document.getElementById("placa").value;

  const user = auth.currentUser;
  if (!user) return alert("Usuário não autenticado");

  await addDoc(collection(db, "dispositivos"), {
    imei,
    nome,
    placa,
    uid: user.uid
  });

  modal.classList.add("hidden");
};

// LISTAR VEÍCULOS DO USUÁRIO
auth.onAuthStateChanged(user => {
  if (!user) return;

  const q = query(
    collection(db, "dispositivos"),
    where("uid", "==", user.uid)
  );

  onSnapshot(q, snap => {
    const ul = document.getElementById("listaVeiculos");
    ul.innerHTML = "";

    snap.forEach(docSnap => {
      const d = docSnap.data();

      const li = document.createElement("li");
      li.innerText = `${d.nome} (${d.placa})`;

      li.onclick = () => {
        if (markers[d.imei]) {
          map.setView(markers[d.imei].getLatLng(), 15);
        }
      };

      ul.appendChild(li);
    });
  });
});

onSnapshot(doc(db, "localizacoes", imei), (docSnap) => {
  if (docSnap.exists()) {
    const { lat, lng } = docSnap.data();
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng]);
  }
});
