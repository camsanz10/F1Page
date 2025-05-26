document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const circuitoId = params.get("id");

    const nombre = document.getElementById("circuit-name");
    const ubicacion = document.getElementById("circuit-location");
    const coordenadas = document.getElementById("circuit-coordinates");
    const wiki = document.getElementById("circuit-wiki");

    fetch(`https://ergast.com/api/f1/2024/circuits/${circuitoId}.json`)
        .then(response => response.json())
        .then(data => {
            const circuito = data.MRData.CircuitTable.Circuits[0];

            nombre.textContent = circuito.circuitName;
            ubicacion.textContent = `Ubicación: ${circuito.Location.locality}, ${circuito.Location.country}`;
            coordenadas.textContent = `Latitud: ${circuito.Location.lat}, Longitud: ${circuito.Location.long}`;
            wiki.innerHTML = `📚 <a href="${circuito.url}" target="_blank">Ver en Wikipedia</a>`;
        })
        .catch(error => {
            console.error("Error al cargar los datos del circuito:", error);
        });
});