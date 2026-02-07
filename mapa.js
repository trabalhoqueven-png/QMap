import { auth, db } from "./firebase.js";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔒 USUÁRIO
let usuarioAtual = null;

// 🗺️ MAPA
let map;
let markers = {};

// 🔐 VERIFICAR LOGIN
onAuthStateChanged(auth, user => {
  if (!user) {
    location.href = "index.html";
    return;
  }

  usuarioAtual = user;
  iniciarMapa();
  listarVeiculos();
});

// 🗺️ INICIAR MAPA
function iniciarMapa() {
  map = L.map("map").setView([-23.55, -46.63], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
  }).addTo(map);
}

// 📋 MODAL
const modal = document.getElementById("modal");
const btnAdd = document.getElementById("btnAdd");
const btnSalvar = document.getElementById("salvar");
const btnFechar = document.getElementById("fechar");

btnAdd.onclick = () => modal.classList.remove("hidden");
btnFechar.onclick = () => modal.classList.add("hidden");

// 💾 SALVAR DISPOSITIVO
btnSalvar.onclick = async () => {
  const imei = document.getElementById("imei").value.trim();
  const nome = document.getElementById("nome").value.trim();
  const placa = document.getElementById("placa").value.trim();

  if (!imei || !nome) {
    alert("Informe IMEI e nome do veículo");
    return;
  }

  await setDoc(doc(db, "dispositivos", imei), {
    uid: usuarioAtual.uid,
    nome,
    placa,
    criadoEm: serverTimestamp()
  });

  modal.classList.add("hidden");
  document.getElementById("imei").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("placa").value = "";
};

// 🚗 LISTAR VEÍCULOS
function listarVeiculos() {
  const lista = document.getElementById("listaVeiculos");

  const q = query(
    collection(db, "dispositivos"),
    where("uid", "==", usuarioAtual.uid)
  );

  onSnapshot(q, snapshot => {
    lista.innerHTML = "";

    snapshot.forEach(docSnap => {
      const d = docSnap.data();

      const li = document.createElement("li");
      li.textContent = `${d.nome} (${d.placa || "sem placa"})`;

      // ✅ AGORA SIM
      li.onclick = () => ouvirLocalizacao(docSnap.id);

      lista.appendChild(li);
    });
  });
}

// 📡 OUVIR LOCALIZAÇÃO EM TEMPO REAL
function ouvirLocalizacao(imei) {
  const ref = doc(db, "localizacoes", imei);

  onSnapshot(ref, snap => {
    if (!snap.exists()) return;

    const { lat, lng } = snap.data();

    if (!markers[imei]) {
      markers[imei] = L.marker([lat, lng]).addTo(map);
    } else {
      markers[imei].setLatLng([lat, lng]);
    }

    map.setView([lat, lng], 15);
  });
}
