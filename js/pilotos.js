document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");

    function obtenerUsuarioActual() {
        return JSON.parse(localStorage.getItem("usuarioLogueado"));
    }

    const imagenesPilotos = {
        "hamilton": "hamilton.png",
        "max_verstappen": "verstappen.png",
        "leclerc": "leclerc.png",
        "alonso": "fernando.png",
        "perez": "perez.png",
        "russell": "russell.png",
        "sainz": "sainz.png",
        "albon": "albon.png",
        "norris": "norris.png",
        "tsunoda": "tsunoda.png",
        "bottas": "bottas.png",
        "piastri": "piastri.png",
        "bearman": "bearman.png",
        "colapinto": "colapinto.png",
        "doohan": "doohan.png",
        "gasly": "gasly.png",
        "ocon": "ocon.png",
        "ricciardo": "ricciardo.png",
        "stroll": "stroll.png",
        "hulkenberg": "hulkenberg.png",
        "sargeant": "sargeant.png",
        "zhou": "zhou.png",
        "lawson": "lawson.png",
        "magnussen": "magnussen.png"
    };

    fetch("https://ergast.com/api/f1/2024/drivers.json")
        .then(response => response.json())
        .then(data => {
            const drivers = data.MRData.DriverTable.Drivers;

            drivers.forEach(driver => {
                const fullName = `${driver.givenName} ${driver.familyName}`;
                const nationality = driver.nationality;
                const driverId = driver.driverId;

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