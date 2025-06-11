document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const circuitoId = params.get("id");

    const nombre = document.getElementById("circuit-name");
    const ubicacion = document.getElementById("circuit-location");
    const fecha = document.getElementById("circuit-date");
    const imagen = document.getElementById("circuit-image");

    const imagenesCircuitos = {
        "bahrain": "bahrain.png",
        "jeddah": "jeddah.png",
        "melbourne": "melbourne.png",
        "shanghai": "shanghai.png",
        "suzuka": "suzuka.png",
        "miami": "miami.png",
        "imola": "imola.png",
        "monaco": "monaco.png",
        "montreal": "montreal.png",
        "barcelona": "barcelona.png",
        "red_bull_ring": "redbull.png",
        "silverstone": "silverstone.png",
        "hungaroring": "hungaroring.png",
        "spa": "spa.png",
        "zandvoort": "zandvoort.png",
        "monza": "monza.png",
        "baku": "baku.png",
        "singapore": "singapore.png",
        "cota": "cota.png",
        "mexico_city": "mexico.png",
        "interlagos": "interlagos.png",
        "vegas": "vegas.png",
        "losail": "losail.png",
        "yas_marina": "yasmarina.png"
    };

    fetch("https://my-json-server.typicode.com/camsanz10/fakeapi/circuitos")
        .then(response => response.json())
        .then(circuitos => {
            const circuito = circuitos.find(c => c.id === circuitoId);

            if (!circuito) {
                nombre.textContent = "Circuito no encontrado.";
                return;
            }

            nombre.textContent = circuito.nombre;
            ubicacion.textContent = `País: ${circuito.pais}`;
            fecha.textContent = `Fecha: ${circuito.fecha}`;

            const archivoImagen = imagenesCircuitos[circuitoId] || "default-circuit.png";
            imagen.src = `../img/circuitos/${archivoImagen}`;
            imagen.alt = `Imagen del circuito ${circuito.nombre}`;
        })
        .catch(error => {
            console.error("Error al cargar los datos del circuito:", error);
        });
});