// Inicializa o mapa
document.addEventListener("DOMContentLoaded", function () {
const map = L.map('map').setView([-23.5505, -46.6333], 13);

// Mapa escuro (estilo profissional)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap'
  maxZoom: 19
}).addTo(map);
});

// Ícone do veículo
const carIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/743/743922.png',
  iconSize: [35, 35]
});

// Marcador
const marker = L.marker([-23.5505, -46.6333], {
  icon: carIcon
}).addTo(map);

marker.bindPopup(`
<b>Veículo 01</b><br>
Status: Online<br>
Velocidade: 60 km/h
`);

