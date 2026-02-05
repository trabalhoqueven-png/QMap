const map = L.map("map").setView([-15.78, -47.93], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

// Clique para criar marcação
map.on("click", function (e) {
  const marker = L.marker(e.latlng).addTo(map);
  marker.bindPopup("🎰 Ponto do Cassino").openPopup();
});
