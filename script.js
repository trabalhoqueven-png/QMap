const bebado = document.getElementById("bebado");
const status = document.getElementById("status");

let posX = 110;
let balanco = 0;
let vivo = true;

// Movimento automático (cambaleando)
setInterval(() => {
  if (!vivo) return;

  balanco += (Math.random() - 0.5) * 10;
  posX += balanco * 0.2;

  if (posX < 0 || posX > 220) {
    status.innerText = "💀 O bêbado caiu!";
    vivo = false;
    bebado.style.animation = "none";
    bebado.style.transform = "rotate(90deg)";
  }

  bebado.style.left = posX + "px";
}, 100);

// Controles
document.addEventListener("keydown", (e) => {
  if (!vivo) return;

  if (e.key === "ArrowLeft") {
    posX -= 20;
  }
  if (e.key === "ArrowRight") {
    posX += 20;
  }
});
const btnEsq = document.getElementById("btnEsq");
const btnDir = document.getElementById("btnDir");

let intervaloEsq = null;
let intervaloDir = null;

// ESQUERDA (TOQUE)
btnEsq.addEventListener("touchstart", () => {
  if (!vivo) return;
  intervaloEsq = setInterval(() => {
    posX -= 5;
  }, 50);
});

btnEsq.addEventListener("touchend", () => {
  clearInterval(intervaloEsq);
});

// DIREITA (TOQUE)
btnDir.addEventListener("touchstart", () => {
  if (!vivo) return;
  intervaloDir = setInterval(() => {
    posX += 5;
  }, 50);
});

btnDir.addEventListener("touchend", () => {
  clearInterval(intervaloDir);
});
