// server.js
const net = require("net");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccount.json"))
});

const db = admin.firestore();

const server = net.createServer(socket => {
  socket.on("data", async data => {
    const msg = data.toString();

    // EXEMPLO (depende do modelo do GPS)
    const imei = "35958701XXXXXX";
    const lat = -23.5505;
    const lng = -46.6333;

    await db.collection("localizacoes").doc(imei).set({
      lat,
      lng,
      timestamp: Date.now()
    });

    console.log("📍 GPS recebido:", imei);
  });
});

server.listen(5000, () => {
  console.log("🚀 Servidor GPS rodando na porta 5000");
});
