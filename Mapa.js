import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
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

updateDoc(doc(db, "users", uid), {
  credits: increment(qtd)
});

onAuthStateChanged(auth, async user => {
  if (!user) return location.href = "index.html";

  const snap = await getDoc(doc(db, "users", user.uid));
  document.getElementById("saldo").innerText =
    snap.data().credits + " créditos";
});

