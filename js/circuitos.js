document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("circuitosGrid");

    fetch("https://ergast.com/api/f1/2024/circuits.json")
        .then(response => response.json())
        .then(data => {
            const circuitos = data.MRData.CircuitTable.Circuits;

            circuitos.forEach(circuito => {
                const nombre = circuito.circuitName;
                const pais = circuito.Location.country;
                const ciudad = circuito.Location.locality;
                const id = circuito.circuitId;

                const item = document.createElement("a");
                item.classList.add("item");
                item.href = `circuito.html?id=${id}`;
                item.innerHTML = `
                    <h3>${nombre}</h3>
                    <p>${ciudad}, ${pais}</p>
                    <button class="favorite-btn" data-id="${id}" data-nombre="${nombre}">⭐ Agregar a Favoritos</button>
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
                        imagen: "../img/default.jpg"
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