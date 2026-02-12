const tareaEntrada = document.getElementById("tareaEntrada");
const botonAgregar = document.getElementById("botonAgregar");
const contenedorTareas = document.getElementById("contenedorTareas");
const mensaje = document.getElementById("mensaje");
const contadorTotales = document.getElementById("contadorTotales");
const contadorTerminadas = document.getElementById("contadorTerminadas");
const botonOcultar = document.getElementById("botonOcultar");
const botonEliminar = document.getElementById("botonEliminar");

let tareasOcultas = false;

function crearElementoTarea() {
    const tareaContenedor = document.createElement("div");
    const tareaTexto = document.createElement("p");
    const iconosContenedor = document.createElement("div");
    const iconoCompletada = document.createElement("i");
    const iconoEliminar = document.createElement("i");

    iconosContenedor.append(iconoCompletada, iconoEliminar);
    tareaContenedor.append(tareaTexto, iconosContenedor);

    tareaContenedor.classList.add("tarea");
    tareaTexto.classList.add("tarea-texto");
    iconosContenedor.classList.add("tareas-iconos");
    iconoCompletada.classList.add("bi", "bi-check-circle");
    iconoEliminar.classList.add("bi", "bi-trash2");

    tareaTexto.innerText = tareaEntrada.value;

    iconoCompletada.addEventListener("click", () => {
        tareaContenedor.classList.toggle("tarea-completada");
        if (tareaContenedor.classList.contains("tarea-completada")) {
            iconoCompletada.classList.replace("bi-check-circle", "bi-dash-circle");
        } else {
            iconoCompletada.classList.replace("bi-dash-circle", "bi-check-circle");
        }
        actualizarContadores();
    });

    iconoEliminar.addEventListener("click", () => {
        tareaContenedor.remove();
        actualizarContadores();
    });

    return tareaContenedor;
}

function actualizarContadores() {
    const tareasTotales = document.querySelectorAll(".tarea").length;
    const tareasTerminadas = document.querySelectorAll(".tarea-completada").length;
    contadorTotales.textContent = tareasTotales;
    contadorTerminadas.textContent = tareasTerminadas;
}

function toggleOcultarCompletadas() {
    const tareasCompletadas = document.querySelectorAll(".tarea-completada");
    tareasOcultas = !tareasOcultas;

    tareasCompletadas.forEach(tarea => {
        tarea.style.display = tareasOcultas ? "none" : "flex";
    });

    botonOcultar.textContent = tareasOcultas ? "Mostrar Completadas" : "Ocultar Completadas";
}

function eliminarCompletadas() {
    const tareasCompletadas = document.querySelectorAll(".tarea-completada");
    tareasCompletadas.forEach(tarea => tarea.remove());
    actualizarContadores();
}

function agregarTarea() {
    const texto = tareaEntrada.value.trim();
    if (texto) {
        const elementoTarea = crearElementoTarea();
        contenedorTareas.append(elementoTarea);
        tareaEntrada.value = "";
        mensaje.textContent = "¡Tarea creada satisfactoriamente!";
        actualizarContadores();
    } else {
        mensaje.textContent = "No escribiste nada, chamaco";
    }
}

botonAgregar.addEventListener("click", agregarTarea);
botonOcultar.addEventListener("click", toggleOcultarCompletadas);
botonEliminar.addEventListener("click", eliminarCompletadas);

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") agregarTarea();
});

tareaEntrada.addEventListener("input", () => {
    mensaje.textContent = tareaEntrada.value.trim() === "" 
        ? "Escribe tu próxima tarea! 😜" 
        : "Al finalizar presiona Enter";
});