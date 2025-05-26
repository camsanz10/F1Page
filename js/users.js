class Usuario {
    constructor(nombre, email, password, telefono = "", direccion = "", favoritos = []) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.direccion = direccion;
        this.favoritos = favoritos;
    }
}

function registrarUsuario(nombre, email, password) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.some(u => u.email === email);
    if (existe) {
        alert("Ya existe un usuario registrado con este correo.");
        return false;
    }

    const nuevoUsuario = new Usuario(nombre, email, password);
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogueado", JSON.stringify(nuevoUsuario));
    return true;
}

function loginUsuario(email, password) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
        return true;
    } else {
        return false;
    }
}

function obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem("usuarioLogueado"));
}

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
}

function actualizarPerfil(nuevosDatos) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const actual = obtenerUsuarioActual();

    const indice = usuarios.findIndex(u => u.email === actual.email);
    if (indice !== -1) {
        usuarios[indice] = { ...usuarios[indice], ...nuevosDatos };
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarios[indice]));
    }
}