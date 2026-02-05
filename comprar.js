import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAT37Au3gOEqT2KzG9eaxE41X_U4mZez4o",
  authDomain: "qmap-981c5.firebaseapp.com",
  projectId: "qmap-981c5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let usuarioAtual = null;

onAuthStateChanged(auth, user => {
  if (!user) location.href = "index.html";
  else usuarioAtual = user;
});

window.comprar = async function(qtd) {
  if (!usuarioAtual) return;

  const confirmar = confirm(
    `Confirma compra de ${qtd} créditos por PIX?`
  );

  if (!confirmar) return;

  // 🔗 Abre o link do Mercado Pago
  window.open("https://mpago.la/12KQxs2", "_blank");

  document.getElementById("msg").innerText =
    "📲 Faça o pagamento via PIX. Após pagar, seus créditos serão liberados.";
};










