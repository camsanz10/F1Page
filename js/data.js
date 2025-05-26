class Integrante {
    constructor(nombre, rol, descripcion, imagen) {
        this.nombre = nombre;
        this.rol = rol;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}

const integrantes = [
    new Integrante(
        "Camila Sánchez",
        "Diseñadora y Desarrolladora",
        "Diseñadora gráfica y estudiante de Diseño de Medios Interactivos en la Universidad Icesi. Apasionada por la Fórmula 1 y el diseño digital, he creado esta plataforma para brindar una experiencia visual y funcional que facilite la exploración de temporadas, carreras, pilotos y equipos. Mi enfoque combina diseño intuitivo, usabilidad y tecnología para ofrecer una navegación fluida y atractiva para todos los aficionados al automovilismo.",
        "../img/mefoto.jpeg"
    )
];