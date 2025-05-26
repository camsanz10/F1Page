function mostrarIntegrantes(lista) {
    const contenedor = document.querySelector(".team");
    lista.forEach((integrante) => {
        const div = document.createElement("div");
        div.classList.add("member");
        div.innerHTML = `
            <img src="${integrante.imagen}" alt="${integrante.nombre}">
            <h3>${integrante.nombre}</h3>
            <p>${integrante.descripcion}</p>
        `;
        contenedor.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarIntegrantes(integrantes);
});