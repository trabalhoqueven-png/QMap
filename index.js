import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 CONFIG FIREBASE
document.getElementById("btnLogin").addEventListener("click", login);
document.getElementById("btnCadastro").addEventListener("click", cadastrar);


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 ELEMENTOS
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const msgEl = document.getElementById("msg");

// 🔹 FUNÇÃO DE MENSAGEM
function msg(texto, cor) {
  msgEl.innerText = texto;
  msgEl.style.color = cor;
}

// 🔐 LOGIN
async function login() {
  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      email.value,
      senha.value
    );

    if (!cred.user.emailVerified) {
      await signOut(auth);
      msg("❌ Confirme seu email antes de entrar.", "red");
      return;
    }

    location.href = "mapa.html";

  } catch (e) {
    msg("❌ Email ou senha inválidos.", "red");
  }
}

async function cadastrar() {
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      email.value,
      senha.value
    );

    await sendEmailVerification(cred.user);

    await setDoc(doc(db, "usuarios", cred.user.uid), {
      email: cred.user.email,
      criadoEm: serverTimestamp()
    });

    await signOut(auth);

    msg("📧 Cadastro criado! Verifique seu email.", "lime");

  } catch (e) {
    msg(e.message, "red");
  }
}

// 🚧 BLOQUEAR USUÁRIO LOGADO NO INDEX
onAuthStateChanged(auth, user => {
  if (user && user.emailVerified) {
    location.href = "map.html";
  }
});
