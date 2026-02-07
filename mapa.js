import { auth, db } from "./firebase.js";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔒 GARANTIR USUÁRIO LOGADO
let usuarioAtual = null;
li.onclick = () => ouvirLocalizacao(docSnap.id);

auth.onAuthStateChanged(user => {
  if (!user) {
    location.href = "index.html";
    return;
  }
  usuarioAtual = user;
  iniciarMapa();
  listarVeiculos();
});

// 🗺️ MAPA
let map;
let markers = {};

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

  try {
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

  } catch (e) {
    alert("Erro ao salvar dispositivo");
    console.error(e);
  }
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
      li.innerText = `${d.nome} (${d.placa || "sem placa"})`;

      lista.appendChild(li);
    });
  });
}
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
