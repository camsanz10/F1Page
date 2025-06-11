document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");

    function obtenerUsuarioActual() {
        return JSON.parse(localStorage.getItem("usuarioLogueado"));
    }

    const imagenesPilotos = {
        "max_verstappen": "verstappen.png",
        "lewis_hamilton": "hamilton.png",
        "charles_leclerc": "leclerc.png",
        "fernando_alonso": "fernando.png",
        "sergio_perez": "perez.png",
        "george_russell": "russell.png",
        "carlos_sainz": "sainz.png",
        "alexander_albon": "albon.png",
        "lando_norris": "norris.png",
        "yuki_tsunoda": "tsunoda.png",
        "valtteri_bottas": "bottas.png",
        "oscar_piastri": "piastri.png",
        "oliver_bearman": "bearman.png",
        "franco_colapinto": "colapinto.png",
        "jack_doohan": "doohan.png",
        "pierre_gasly": "gasly.png",
        "esteban_ocon": "ocon.png",
        "daniel_ricciardo": "ricciardo.png",
        "lance_stroll": "stroll.png",
        "nico_hulkenberg": "hulkenberg.png",
        "logan_sargeant": "sargeant.png",
        "zhou_guanyu": "zhou.png",
        "liam_lawson": "lawson.png",
        "kevin_magnussen": "magnussen.png"
    };

    fetch("https://my-json-server.typicode.com/camsanz10/f1-fakeapi/drivers-details")
    .then(response => response.json())
    .then(drivers => {
        drivers.forEach(driver => {
            const fullName = driver.nombre;
            const nationality = driver.nacionalidad;
            const driverId = driver.id;

            const imageName = imagenesPilotos[driverId] || "default.png";

            const item = document.createElement("a");
            item.classList.add("item");
            item.href = `piloto1.html?id=${driverId}`;

            item.innerHTML = `
                <img src="../img/${imageName}" alt="${fullName}" onerror="this.src='../img/default.png'">
                <h3>${fullName}</h3>
                <p>Nacionalidad: ${nationality}</p>
                <button class="favorite-btn" 
                    data-id="${driverId}" 
                    data-nombre="${fullName}" 
                    data-imagen="../img/${imageName}">
                    ⭐ Agregar a Favoritos
                </button>
            `;

            grid.appendChild(item);
        });

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

                    const yaExiste = favoritos[usuario.nombre].pilotos.some(p => p.id === id);
                    if (yaExiste) {
                        alert("Este piloto ya está en tus favoritos.");
                        return;
                    }

                    favoritos[usuario.nombre].pilotos.push({
                        id,
                        nombre,
                        imagen
                    });

                    localStorage.setItem("favoritos", JSON.stringify(favoritos));
                    alert("Piloto agregado a favoritos.");
                }
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos de los pilotos:", error);
        });
});