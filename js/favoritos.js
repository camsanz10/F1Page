document.addEventListener("DOMContentLoaded", () => {
    const usuario = obtenerUsuarioActual();
    const contenedor = document.getElementById("favoritosContainer");

    if (!usuario) {
        contenedor.innerHTML = "<p>Debes iniciar sesión para ver tus favoritos.</p>";
        return;
    }

    cargarFavoritos(usuario.nombre);
});

function cargarFavoritos(nombreUsuario) {
    const contenedor = document.getElementById("favoritosContainer");
    contenedor.innerHTML = "";

    const favoritos = JSON.parse(localStorage.getItem(`favoritos_${nombreUsuario}`)) || [];

    if (favoritos.length === 0) {
        contenedor.innerHTML = "<p>No tienes elementos en favoritos.</p>";
        return;
    }

    favoritos.forEach(fav => {
        const link = document.createElement("a");
        link.classList.add("item");
        link.href = fav.tipo === "piloto"
            ? `piloto.html?id=${fav.id}`
            : `circuito.html?id=${fav.id}`;

        link.innerHTML = `
            <h3>${fav.nombre}</h3>
            <p>${fav.extra || ""}</p>
            <button class="remove-btn" data-id="${fav.id}" data-tipo="${fav.tipo}">❌ Quitar</button>
        `;

        contenedor.appendChild(link);
    });

    contenedor.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            e.preventDefault();
            const id = e.target.dataset.id;
            const tipo = e.target.dataset.tipo;
            const usuario = obtenerUsuarioActual();
            quitarDeFavoritos(usuario.nombre, id, tipo);
            cargarFavoritos(usuario.nombre);
        }
    });
}

function quitarDeFavoritos(nombreUsuario, id, tipo) {
    const clave = `favoritos_${nombreUsuario}`;
    let favoritos = JSON.parse(localStorage.getItem(clave)) || [];

    favoritos = favoritos.filter(f => !(f.id === id && f.tipo === tipo));
    localStorage.setItem(clave, JSON.stringify(favoritos));
}