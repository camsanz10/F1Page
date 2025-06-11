document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("circuitosGrid");

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
            circuitos.forEach(circuito => {
                const imagenArchivo = imagenesCircuitos[circuito.id] || "default-circuit.png";

                const item = document.createElement("a");
                item.classList.add("item");
                item.href = `circuito.html?id=${circuito.id}`;
                item.innerHTML = `
                    <img src="../img/circuitos/${imagenArchivo}" alt="${circuito.nombre}" class="circuit-image">
                    <h3>${circuito.nombre}</h3>
                    <button class="favorite-btn" data-id="${circuito.id}" data-nombre="${circuito.nombre}" data-imagen="${imagenArchivo}">⭐ Agregar a Favoritos</button>
                `;
                grid.appendChild(item);
            });

            // Lógica de favoritos
            grid.addEventListener("click", (e) => {
                if (e.target.classList.contains("favorite-btn")) {
                    e.preventDefault();

                    const usuario = obtenerUsuarioActual();
                    if (!usuario) {
                        alert("Debes iniciar sesión para agregar favoritos.");
                        return;
                    }

                    const btn = e.target;
                    const id = btn.dataset.id;
                    const nombre = btn.dataset.nombre;
                    const imagen = btn.dataset.imagen;

                    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || {};
                    if (!favoritos[usuario.nombre]) {
                        favoritos[usuario.nombre] = { pilotos: [], circuitos: [] };
                    }

                    const yaExiste = favoritos[usuario.nombre].circuitos.some(c => c.id === id);
                    if (yaExiste) {
                        alert("Este circuito ya está en tus favoritos.");
                        return;
                    }

                    favoritos[usuario.nombre].circuitos.push({
                        id,
                        nombre,
                        imagen: `../img/circuitos/${imagen}`
                    });
                    localStorage.setItem("favoritos", JSON.stringify(favoritos));
                    alert("Circuito agregado a favoritos.");
                }
            });
        })
        .catch(error => {
            console.error("Error al cargar los circuitos:", error);
        });
});